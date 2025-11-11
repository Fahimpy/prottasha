from django.shortcuts import render, get_object_or_404 
from django.core.paginator import Paginator
from django.utils.text import slugify
from .models import *

# Create your views here.
def home(request):
    sdata = About.objects.first()
    hnotices = Notice.objects.filter().order_by('-created_at')[:5]
    teachers = Teachers.objects.all()
    gallery = Gallary.objects.filter().order_by('-created_at')[:6]
    for t in teachers:
        t.slug = slugify(t.name)  # runtime slug

    return render(request, 'home.html', {'sdata': sdata, 'hnotices': hnotices, 'teachers': teachers, 'gallery': gallery})

def about(request):
    sdata = About.objects.first()
    school_data = About.objects.first() 

    return render(request, 'about.html', {'school_data': school_data, 'sdata': sdata})

def contact(request):
    sdata = About.objects.first()
    return render(request, 'contact.html', {'sdata': sdata})

def teachers(request):
    sdata = About.objects.first()
    teachers = Teachers.objects.all()
    for t in teachers:
        t.slug = slugify(t.name)  # runtime slug
    return render(request, 'teachers.html', {'sdata': sdata, 'teachers': teachers})

def admission(request):
    sdata = About.objects.first()
    return render(request, 'admissions.html', {'sdata': sdata})

def results(request):
    sdata = About.objects.first()
    return render(request, 'results.html', {'sdata': sdata})

def jobs(request):
    sdata = About.objects.first()
    return render(request, 'jobs.html', {'sdata': sdata})

def notices(request):
    sdata = About.objects.first()
    all_notices = Notice.objects.filter().order_by('-created_at')
    paginator = Paginator(all_notices, 9)
    page_number = request.GET.get('page')
    npage_obj = paginator.get_page(page_number)
    return render(request, 'notices.html', {'all_notices': all_notices, 'npage_obj': npage_obj, 'sdata': sdata})

def notice_detail(request, slug):
    sdata = About.objects.first()
    notice = get_object_or_404(Notice, slug=slug)
    return render(request, 'notice-details.html', {'notice': notice, 'sdata': sdata})

def teacher_detail(request, tslug):
    sdata = About.objects.first()
    teacher = get_object_or_404(Teachers, tslug=tslug,)
        # specializations & achievements list
    specializations = [teacher.Specialization1, teacher.Specialization2, teacher.Specialization3]
    specializations = [s for s in specializations if s]

    achievements = [teacher.achievements1, teacher.achievements2, teacher.achievements3]
    achievements = [a for a in achievements if a]

    context = {
        'teacher': teacher,
        'sdata': sdata,
        'specializations': specializations,
        'achievements': achievements,
    }
    return render(request, 'teacher-profile.html',context)


