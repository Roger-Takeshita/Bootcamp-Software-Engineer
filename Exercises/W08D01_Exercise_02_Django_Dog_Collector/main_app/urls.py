
#!                                             mm                              
#!                                             MM                              
#!            `7Mb,od8  ,pW"Wq.  `7MM  `7MM  mmMMmm   .gP"Ya  `7Mb,od8 ,pP"Ybd 
#!              MM' "' 6W'   `Wb   MM    MM    MM    ,M'   Yb   MM' "' 8I   `" 
#!              MM     8M     M8   MM    MM    MM    8M""""""   MM     `YMMMa. 
#!              MM     YA.   ,A9   MM    MM    MM    YM.    ,   MM     L.   I8 
#!            .JMML.    `Ybmd9'    `Mbod"YML.  `Mbmo  `Mbmmd' .JMML.   M9mmmP' 

from django.urls import path                    #! 1- import 'path' function that will be used to define each route
from . import views                             #! 2- '.' looks inside of package directory and imports the view package

urlpatterns = [                                    #+ 2.1 - 'urlpatterns' will hold each route we define for 'main_app'
   path('', views.home, name='home'),                 #- 2.1.1 - Define the path of the home page
                                                         #? 2.1.1.1 - Inside of `main_app/views.py` we have our 'home' (controller)
                                                         #? 2.1.1.2 - Instead of hard code the name of the controller, We are giving the name 'home' so we can use it in other parts of the applicaton (usually in templates)
   path('about/', views.about, name='about'),
   path('dogs/', views.dogs_index, name='index'),
   path('dogs/<int:dog_id>/', views.dogs_detail, name='detail')
]