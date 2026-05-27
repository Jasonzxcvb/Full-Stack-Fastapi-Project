from datetime import datetime

from sqlmodel import Field, SQLModel


class OrderBase(SQLModel):
    product_name: str
    quantity: int = Field(gt=0)
    status: str = "pending"


class Order(OrderBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)


class OrderCreate(OrderBase):
    pass


class OrderStatusUpdate(SQLModel):
    status: str


class OrderPublic(OrderBase):
    id: int
    created_at: datetime


class OrdersPublic(SQLModel):
    data: list[OrderPublic]
