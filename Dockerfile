FROM python:3.8
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt
#RUN pip install python-dotenv
RUN pip install flask-mysql
#RUN pip install setuptools
RUN chmod -R a+rwx models
RUN chmod -R a+rwx views
RUN chmod -R a+rwx controllers
#EXPOSE 80
EXPOSE 5000
ENV NAME PONTUAL
WORKDIR /
COPY db.sql /docker-entrypoint-initdb.d
CMD ["python","app.py"]
