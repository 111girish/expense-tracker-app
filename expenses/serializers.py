from rest_framework import serializers
from .models import Expenses

class ExpenseSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Expenses
    field = "__all__"
