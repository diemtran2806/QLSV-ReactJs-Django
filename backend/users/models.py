from django.db import models
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Email is required')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class Users(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    mssv = models.CharField(max_length=30, blank=True, null=True, unique=True)
    password = models.CharField(
        max_length=255, blank=True, null=True, default=None)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'mssv'
    REQUIRED_FIELDS = []

    phone = models.CharField(max_length=10, unique=True)
    id_role = models.ForeignKey('roles.Roles', on_delete=models.CASCADE)
    cccd = models.CharField(max_length=20, unique=True, blank=True)
    address = models.CharField(max_length=255, blank=True)
    gender = models.BooleanField()
    dob = models.DateField(null=True, blank=True)
    avatar = models.CharField(max_length=255, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    def __str__(self):
        return self.mssv
