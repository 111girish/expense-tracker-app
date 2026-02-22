from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
  path('signup/', views.signup, name='signup'),
  path('login/', TokenObtainPairView.as_view(), name='login'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('expenses/', views.expense_list, name='expense_list'),
  path('expenses/<int:pk>', views.expense_detail, name='expense_detail'),
]