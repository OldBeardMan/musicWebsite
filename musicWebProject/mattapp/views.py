from django.shortcuts import render
from .forms import SubscribeForm, MessageForm

def home_view(request):

    if request.method == 'POST':
        form1 = SubscribeForm(request.POST)
        form2 = MessageForm(request.POST)
        
        if form1.is_valid():
            form1.save()

        if form2.is_valid():
            form2.save()

    else:
        form1 = SubscribeForm()
        form2 = MessageForm()

    return render(request, 'index.html', {'form1': form1, 'form2': form2})


def rezerwacja_view(request):

    return render(request, 'rezerwacja.html')

def about_view(request):
    
    return render(request, 'about.html')

def iceland_view(request):

    return render(request, 'iceland.html')

def norway_view(request):

    return render(request, 'norway.html')

def winter_view(request):

    return render(request, 'winter.html')

def coversvol1_view(request):

    return render(request, 'covers1.html')

def intheautumnforest_view(request):

    return render(request, 'intheautumnforest.html')

def bc_view(request):

    return render(request, 'bc.html')

def coversvol2_view(request):

    return render(request, 'covers2.html')

def lostkittens_view(request):

    return render(request, 'lostkittens.html')

def carmelis_view(request):

    return render(request, 'carmelis.html')

