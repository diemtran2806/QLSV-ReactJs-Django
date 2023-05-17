from rest_framework.permissions import BasePermission


class IsRole1User(BasePermission):
    def has_permission(self, request, view):
        print(1)
        # Kiểm tra xem user có tồn tại và có id_role = 1 không
        return request.user and request.user.id_role.id_role == 1


class IsRole2User(BasePermission):
    def has_permission(self, request, view):
        print(2)
        # Kiểm tra xem user có tồn tại và có id_role = 2 không
        return request.user and request.user.id_role.id_role == 2


class IsRole3User(BasePermission):
    def has_permission(self, request, view):
        # Kiểm tra xem user có tồn tại và có id_role = 3 không
        print(3)
        return request.user and request.user.id_role.id_role == 3


class IsSameUser(BasePermission):
    def has_permission(self, request, view):
        # Kiểm tra xem người dùng đã đăng nhập và có cùng ID người dùng
        return request.user and int(request.user.id) == view.kwargs.get('id')
