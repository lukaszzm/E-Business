FROM ubuntu:24.04

RUN apt-get update && \
    apt-get install -y \
    openjdk-8-jdk \
    wget \
    unzip \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN wget -q https://github.com/JetBrains/kotlin/releases/download/v1.9.22/kotlin-compiler-1.9.22.zip && \
    unzip kotlin-compiler-1.9.22.zip -d /opt && \
    rm kotlin-compiler-1.9.22.zip

ENV PATH $PATH:/opt/kotlinc/bin

RUN wget -q https://services.gradle.org/distributions/gradle-8.6-bin.zip && \
    unzip gradle-8.6-bin.zip -d /opt && \
    rm gradle-8.6-bin.zip

ENV PATH $PATH:/opt/gradle-8.6/bin

RUN java -version && \
    kotlin -version && \
    gradle -version

WORKDIR /app

RUN mkdir -p src/main/kotlin

COPY build.gradle .
COPY HelloWorld.kt src/main/kotlin/

RUN gradle build

CMD ["gradle", "run"]