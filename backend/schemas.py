from pydantic import BaseModel, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

# --- Auth ---
class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    name: str
    email: str
    created_at: datetime

# --- Cart ---
class CartItemAdd(BaseModel):
    product_id: int
    quantity: int = 1

class CartItemOut(BaseModel):
    id: int
    product_id: int
    title: str
    price: int
    quantity: int
    image: Optional[str]

# --- Order ---
class Address(BaseModel):
    city: str
    street: str
    house: str
    apartment: Optional[str] = ""

class OrderCreate(BaseModel):
    delivery_method: str
    delivery_price: int
    payment_method: str
    promo_discount: int = 0
    address: Optional[Address] = None

class OrderItemOut(BaseModel):
    product_id: int
    title: str
    price: int
    quantity: int
    image: Optional[str]

class OrderOut(BaseModel):
    id: int
    order_number: str
    status: str
    total_amount: int
    delivery_method: str
    delivery_price: int
    payment_method: str
    promo_discount: int
    address: Optional[Dict]
    created_at: datetime
    items: List[OrderItemOut] = []