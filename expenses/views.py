from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Expenses
from .serializers import ExpenseSerializer

# Create your views here.

@api_view(['GET', 'POST'])
def expense_list(request):
  """List all expenses, or create a new expense"""
  if request.method == "GET":
    #if request is get then get all the expenses in the model
    expenses = Expenses.objects.all()
    #turn all the expenses to JSON format
    serializer = ExpenseSerializer(expenses, many=True)
    #return the serializer data
    return Response(serializer.data)
  
  elif request.method == "POST":
    #if request is post then get the data from the request and create a new instance(object) of the class expenseSerializer
    serializer = ExpenseSerializer(data=request.data)
    #if serializer is valid then save it to the database
    if serializer.is_valid():
      serializer.save()
      #if data is saved then return the saved data to react with id now
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    #if data is not valid the return error
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

@api_view(['GET', 'PUT', 'DELETE'])
def expense_detail(request, pk):
  #try the following code which could be wrong
  try:
    #create a expense instance from the models.py by getting the primary key from the request
    expense = Expenses.objects.get(pk=pk)
    #if there is an error and expense doesnot exist then return response which says not found
  except Expenses.DoesNotExist:
    return Response(
      {'error': 'Expense Not Found'},
      status=status.HTTP_404_NOT_FOUND
    )
  
  if request.method == "GET":
    #if the request is GET then turn the data that we got from models to JSON and create a instance
    serializer = ExpenseSerializer(expense)
    #return the data that we got from the expense instance
    return Response(serializer.data)
  
  elif request.method == "PUT":
    #if the request method is PUT then get both expense instance of models.py as well as the data returned from the request which will override the previous data.
    serializer = ExpenseSerializer(expense, data=request.data)
    #if serializer is valid then save and return the response to react
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    #if serailizer is not valid then return error and specific status
    return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
  
  elif request.method == "DELETE":
    #if request method is delete then delete the given data from the database
    expense.delete()
    #return status that there is no content
    return Response(status=status.HTTP_204_NO_CONTENT)
  
  


