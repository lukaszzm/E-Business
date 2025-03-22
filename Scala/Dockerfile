FROM sbtscala/scala-sbt:eclipse-temurin-23.0.2_7_1.10.11_3.6.4

WORKDIR /app

COPY build.sbt /app/
COPY project /app/project

COPY app /app/app/
COPY conf /app/conf/
COPY public /app/public/

RUN sbt update

RUN sbt compile

EXPOSE 9000

CMD ["sbt", "run"]

