# Stage 1: Build the app
FROM eclipse-temurin:21-jdk AS builder
WORKDIR /app

# Copy Maven wrapper and project files
COPY mvnw .
COPY .mvn/ .mvn
COPY pom.xml ./
COPY src ./src

# Give execute permission for mvnw
RUN chmod +x mvnw

# Build the application
RUN ./mvnw clean package -DskipTests

# Stage 2: Run the app
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the built jar from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port
EXPOSE 2008

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
