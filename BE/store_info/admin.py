from django.contrib import admin

# Register your models here.
from .models import Store, Stamp

admin.site.register(Store)
admin.site.register(Stamp)

