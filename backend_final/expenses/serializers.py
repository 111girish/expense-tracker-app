from rest_framework import serializers
from .models import Expense
from django.contrib.auth.models import User

class ExpenseSerializer(serializers.ModelSerializer):
  class Meta: 
    model = Expense
    fields = ['id', 'title', 'amount', 'category', 'date', 'description', 'created_at', 'updated_at']
    read_only_fields = ['id', 'created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
  password = serializers.CharField(write_only=True)

  class Meta:
    model = User
    fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
      user = User.objects.create_user(
        username=validated_data['username'],
        email=validated_data.get('email', ''),
        password=validated_data['password']

      )
      return user
      