
from django.urls import path
from pweb import views as view

urlpatterns = [
    path('teachers/', view.teachers, name='teachers'),
    path('notices/', view.notices, name='notices'),
    path('notices/<slug:slug>/', view.notice_detail, name='notice_detail'),
    path('teachers/<slug:tslug>/', view.teacher_detail, name='teacher_detail'),
    
]
