from django.utils import timezone
from django.db import models
from django.contrib import admin
from django.utils.text import slugify
from ckeditor_uploader.fields import RichTextUploadingField


# Create your models here.

class Notice(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )
    PRIORITY_CHOICES = (
        ('low', 'Low'), 
        ('medium', 'Medium'), 
        ('high', 'High'),
    )
    TOPIC_CHOICES = (
        ('admission', 'ADMISSION'), 
        ('exam', 'EXAM'), 
        ('event', 'EVENT'), 
        ('holiday', 'HOLIDAY'), 
        ('general', 'GENERAL'),
    )
    title = models.CharField(max_length=255)
    notice_no = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True)
    content = RichTextUploadingField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    attachment = models.FileField(upload_to='attachments/', blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='published')
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='medium')
    topic = models.CharField(max_length=10, choices=TOPIC_CHOICES, default='general')

    def __str__(self):
        return super().__str__() + self.title + " - " + self.notice_no
    
    def save(self, *args, **kwargs):
        if not self.created_at:  # only set when creating new object
            self.created_at = timezone.now()  # full datetime
        self.slug = f"{self.created_at.year}-{self.notice_no}"  # use only the year in slug
        super().save(*args, **kwargs)

class About(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='Logo/', blank=True, null=True)
    slogan = models.CharField(max_length=255, blank=True, null=True)
    mobile_no = models.CharField(max_length=20, blank=True, null=True, help_text="Enter mobile number")
    email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    instragram = models.URLField(blank=True, null=True)
    longtitude = models.CharField(max_length=50, blank=True, null=True)
    latitude = models.CharField(max_length=50, blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='published')
    
    def __str__(self):
        return super().__str__() + self.name
    
class slider(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='Slider/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='published')

    def __str__(self):
        return super().__str__() + self.title 
    
class Gallary(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to='Gallary/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    description = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='published')

    def __str__(self):
        return super().__str__() + self.title
    
class Teachers(models.Model):
    STATUS_CHOICES = (
        ('draft', 'Draft'),
        ('published', 'Published'),
    )

    name = models.CharField(max_length=255)
    tslug = models.SlugField(blank=True, unique=True, null=True)
    photo = models.ImageField(upload_to='Teachers/', blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    experience = models.TextField(blank=True, null=True, help_text="Example: 5 years")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    about = RichTextUploadingField(blank=True, null=True)
    education = models.TextField(blank=True, null=True, help_text="Write educational qualification as text / paragraph here")
    subject = models.CharField(max_length=100, blank=True, null=True, help_text="mathematics, science, English, Bangla, Social-science, Ict, Islam etc")
    Specialization1 = models.TextField(blank=True, null=True)
    Specialization2 = models.TextField(blank=True, null=True)
    Specialization3 = models.TextField(blank=True, null=True)
    achievements1 = models.TextField(blank=True, null=True)
    achievements2 = models.TextField(blank=True, null=True)
    achievements3 = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='published')
    trank = models.IntegerField(default=0, help_text="Rank will determine the order of apparance, Lower the rank, higher the appparance")
                                     
    def save(self, *args, **kwargs):
        if not self.tslug and self.name:
            base_slug = slugify(self.name)
            slug = base_slug
            counter = 1
            while Teachers.objects.filter(tslug=slug).exclude(pk=self.pk).exists():
                slug = f"{base_slug}-{counter}"
                counter += 1
            self.tslug = slug
        super().save(*args, **kwargs)


        # যদি rank দেওয়া না থাকে (None বা 0)
        if self.trank is None or self.trank == 0:
            last_rank = Teachers.objects.aggregate(models.Max('rank'))['trank__max'] or 0
            self.trank = last_rank + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return super().__str__() + self.name + " - " + self.designation + " - " + self.subject
    





