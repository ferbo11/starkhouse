pipeline {
    agent any

    parameters {
        string(name: 'BRANCH_NAME', defaultValue: 'main', description: 'Nombre de la rama para construir')
        choice(name: 'ENVIRONMENT', choices: ['development', 'staging', 'production'], description: 'Entorno de despliegue')
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Clonando el código desde la rama: ${params.BRANCH_NAME}"
                git branch: "${params.BRANCH_NAME}", url: 'https://github.com/bcaal87/starkhouse.git'
            }
        }

        stage('Validate HTML') {
            steps {
                echo "Validando archivos HTML..."
                // Valida todos los archivos HTML en el proyecto
                sh 'tidy -errors -q *.html || true'
            }
        }

        stage('Validate JavaScript') {
            steps {
                echo "Validando archivos JavaScript..."
                // Valida todos los archivos JavaScript en el proyecto
                sh 'jshint **/*.js || true'
            }
        }

        stage('Deploy') {
            steps {
                echo "Desplegando en el entorno: ${params.ENVIRONMENT}"
                // Despliega los archivos al servidor correspondiente según el entorno
                if (params.ENVIRONMENT == 'production') {
                    sh 'scp -r * usuario@produccion:/ruta/del/servidor'
                } else if (params.ENVIRONMENT == 'staging') {
                    sh 'scp -r * usuario@staging:/ruta/del/servidor'
                } else {
                    sh 'scp -r * usuario@development:/ruta/del/servidor'
                }
            }
        }
    }

    post {
        success {
            echo 'El pipeline se ha completado exitosamente.'
        }
        failure {
            echo 'El pipeline ha fallado.'
        }
    }
}
