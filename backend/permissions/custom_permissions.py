from rest_framework.permissions import BasePermission


class IsStudent(BasePermission):
    def has_permission(self, request, view):
        # Kiểm tra xem user có tồn tại và có id_role = 1 không
        return request.user and hasattr(request.user, 'id_role') and request.user.id_role.id_role == 1


class IsLecturer(BasePermission):
    def has_permission(self, request, view):
        # Kiểm tra xem user có tồn tại và có id_role = 2 không
        return request.user and hasattr(request.user, 'id_role') and request.user.id_role.id_role == 2


class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        # Kiểm tra xem user có tồn tại và có id_role = 3 không
        return request.user and hasattr(request.user, 'id_role') and request.user.id_role.id_role == 3


class IsSameUser(BasePermission):
    def has_permission(self, request, view):
        # Kiểm tra xem người dùng đã đăng nhập và có cùng ID người dùng
        return request.user and hasattr(request.user, 'id') and int(request.user.id) == view.kwargs.get('id')
