from django.db import models

# Create your models here.


# Store model
class Store(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=30)
    category = models.CharField(max_length=50)
    address = models.CharField(max_length=50)
    roadAddress = models.CharField(max_length=50)
    telephone = models.CharField(max_length=30)
    link = models.URLField(max_length=100)
    description = models.TextField()
    mapx = models.FloatField()
    mapy = models.FloatField()
    # image = models.ImageField(upload_to='store_images', blank=True)  -> object storage로 변경 예정

    def __str__(self):
        return self.name + self.roadAddress

