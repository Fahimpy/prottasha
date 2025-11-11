from django.contrib import admin
from .models import Notice, About, slider, Gallary, Teachers

# Register your models here.

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ('title', 'notice_no', 'created_at', 'updated_at')
    search_fields = ('title', 'notice_no')
    ordering = ('-created_at',)
    list_per_page = 10 

@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    list_display = ('name', 'mobile_no', 'email',)

@admin.register(slider)
class sliderAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    ordering = ('-created_at',)
    list_per_page = 10

@admin.register(Gallary)
class GallaryAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at', 'updated_at')
    ordering = ('-created_at',)
    list_per_page = 10

@admin.register(Teachers)
class TeachersAdmin(admin.ModelAdmin):
    list_display = ('name', 'designation')
    ordering = ('-created_at',)
    list_per_page = 10



