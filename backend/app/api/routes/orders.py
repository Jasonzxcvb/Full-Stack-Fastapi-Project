from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, col, select

from app.core.db import get_session
from app.models import Order, OrderCreate, OrderPublic, OrdersPublic, OrderStatusUpdate


router = APIRouter(prefix="/orders", tags=["orders"])


@router.get("", response_model=OrdersPublic)
def get_orders(session: Session = Depends(get_session)) -> OrdersPublic:
    orders = session.exec(select(Order).order_by(col(Order.id))).all()
    return OrdersPublic(data=[OrderPublic.model_validate(order) for order in orders])


@router.get("/{order_id}", response_model=OrderPublic)
def get_order(order_id: int, session: Session = Depends(get_session)) -> OrderPublic:
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return OrderPublic.model_validate(order)


@router.post("", response_model=OrderPublic, status_code=201)
def create_order(
    order_in: OrderCreate,
    session: Session = Depends(get_session),
) -> OrderPublic:
    order = Order.model_validate(order_in)
    session.add(order)
    session.commit()
    session.refresh(order)
    return OrderPublic.model_validate(order)


@router.patch("/{order_id}/status", response_model=OrderPublic)
def update_order_status(
    order_id: int,
    status_in: OrderStatusUpdate,
    session: Session = Depends(get_session),
) -> OrderPublic:
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    order.status = status_in.status
    session.add(order)
    session.commit()
    session.refresh(order)
    return OrderPublic.model_validate(order)


@router.delete("/{order_id}")
def delete_order(order_id: int, session: Session = Depends(get_session)) -> dict:
    order = session.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")

    session.delete(order)
    session.commit()
    return {"data": f"Order with id {order_id} has been deleted."}
