# 🚀 Desplegar Backend en Railway - Guía Completa

## ✅ Pre-requisitos

- ✅ Cuenta en Railway creada
- ✅ Repositorio en GitHub
- ✅ `requirements.txt` con todas las dependencias
- ✅ `nixpacks.toml` configurado (ya creado)
- ✅ `runtime.txt` actualizado a `python-3.11`

## 📋 Pasos para Desplegar

### Paso 1: Conectar Repositorio en Railway

1. Ve a https://railway.app
2. Inicia sesión con tu cuenta
3. Haz clic en **New Project**
4. Selecciona **Deploy from GitHub repo**
5. Autoriza a Railway para acceder a tus repositorios si es necesario
6. Selecciona tu repositorio: `Heiner2001/ProyectoFinal`
7. Railway detectará automáticamente que es un proyecto Python

### Paso 2: Crear Base de Datos PostgreSQL

1. En tu proyecto de Railway, haz clic en **+ New**
2. Selecciona **Database** → **Add PostgreSQL**
3. Railway creará automáticamente la base de datos
4. ⚠️ **IMPORTANTE**: Railway creará automáticamente la variable `DATABASE_URL` en tu servicio web

### Paso 3: Configurar Variables de Entorno

1. Haz clic en tu servicio web (el que se creó automáticamente)
2. Ve a la pestaña **Variables**
3. Agrega/verifica estas variables de entorno:

```
SECRET_KEY=<Genera una clave secreta segura>
DEBUG=False
ALLOWED_HOSTS=*.railway.app,*.up.railway.app
USE_HTTPS=True
DATABASE_URL=<Railway lo genera automáticamente desde la base de datos>
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://heiner2001.github.io,https://heiner2001.github.io/ProyectoFinal
CSRF_TRUSTED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://heiner2001.github.io,https://heiner2001.github.io/ProyectoFinal
SESSION_COOKIE_SAMESITE=None
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SAMESITE=None
CSRF_COOKIE_SECURE=True
```

**Nota sobre DATABASE_URL**: Railway conecta automáticamente la base de datos al servicio web. Si no aparece, puedes:
- Hacer clic en la base de datos PostgreSQL
- Copiar la variable `DATABASE_URL` 
- Pegarla en las variables del servicio web

### Paso 4: Configurar el Start Command

1. En tu servicio web, ve a la pestaña **Settings**
2. Busca la sección **Deploy**
3. Verifica que el **Start Command** sea:
   ```
   daphne -b 0.0.0.0 -p $PORT proyectofinal.asgi:application
   ```
4. Si no está configurado, agrégalo manualmente

### Paso 5: Configurar Build Command (Opcional)

Railway debería detectar automáticamente el build, pero si necesitas configurarlo manualmente:

1. En **Settings** → **Deploy**
2. **Build Command** (opcional, Railway lo detecta automáticamente):
   ```
   pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput
   ```

### Paso 6: Esperar el Deployment

1. Ve a la pestaña **Deployments** de tu servicio
2. Verás el proceso de build en tiempo real:
   - Clonando repositorio...
   - Instalando Python (usando nixpacks.toml)...
   - Instalando dependencias...
   - Ejecutando migraciones...
   - Iniciando servidor...
3. ⏱️ Esto puede tardar 5-10 minutos
4. Cuando veas "Deployment successful", el backend está listo

### Paso 7: Obtener la URL del Servicio

1. En la pestaña **Settings** de tu servicio
2. Busca la sección **Networking**
3. Haz clic en **Generate Domain**
4. Copia la URL (algo como `https://tu-proyecto-production.up.railway.app`)
5. Esta será la URL de tu backend

### Paso 8: Crear Usuarios

Una vez que el backend esté desplegado:

1. Ve a la pestaña **Deployments**
2. Haz clic en el deployment más reciente
3. Haz clic en **View Logs**
4. En la parte inferior, verás una terminal
5. Ejecuta:
   ```bash
   python manage.py createsuperuser
   ```
6. Sigue las instrucciones para crear el usuario

**Alternativa**: Usa el comando personalizado:
```bash
python manage.py create_superuser
```

### Paso 9: Verificar que Funciona

1. Copia la URL de tu servicio (ej: `https://tu-proyecto-production.up.railway.app`)
2. Abre en tu navegador: `https://tu-proyecto-production.up.railway.app/api/user/`
3. Debe responder (aunque sea un error 401, significa que funciona)

## ✅ Listo!

Una vez completado:
- ✅ El backend estará disponible en tu dominio de Railway
- ✅ El frontend en GitHub Pages podrá conectarse
- ✅ Podrás hacer login desde `https://heiner2001.github.io/ProyectoFinal/`

## 🔧 Solución de Problemas

### Error: "mise install failed" o "no se encontró ninguna versión precompilada de Python"

**Solución**: 
- ✅ Ya está solucionado con `nixpacks.toml` y `runtime.txt` actualizado
- Si persiste, verifica que los archivos estén en el repositorio:
  - `nixpacks.toml` (debe estar en la raíz)
  - `runtime.txt` (debe contener `python-3.11`)

### Error: "Build failed"

- Revisa los logs en Railway (pestaña **Deployments** → **View Logs**)
- Verifica que `requirements.txt` tenga todas las dependencias
- Asegúrate de que el código esté en la rama `main` de GitHub
- Verifica que `nixpacks.toml` esté correctamente formateado

### Error: "Database connection failed"

- Verifica que `DATABASE_URL` esté configurada correctamente
- Asegúrate de que la base de datos PostgreSQL esté creada
- En Railway, la base de datos se conecta automáticamente, pero verifica en **Variables**

### Error: "Application failed to start"

- Verifica que el **Start Command** sea: `daphne -b 0.0.0.0 -p $PORT proyectofinal.asgi:application`
- Revisa los logs para ver el error específico
- Asegúrate de que todas las dependencias estén instaladas

### El servicio está en "Sleep"

- Railway en el plan gratuito puede poner servicios en sleep después de inactividad
- La primera petición puede tardar ~30 segundos en "despertar"
- Considera usar el plan de pago si necesitas que esté siempre activo

### Error de CORS

- Verifica que `CORS_ALLOWED_ORIGINS` incluya la URL de tu frontend
- Asegúrate de que `USE_HTTPS=True` si estás usando HTTPS
- Verifica que `CSRF_TRUSTED_ORIGINS` también incluya tu frontend

## 📝 Archivos Importantes para Railway

- `nixpacks.toml` - Configuración de build para Railway
- `runtime.txt` - Versión de Python (debe ser `python-3.11`)
- `requirements.txt` - Dependencias de Python
- `Procfile` - Comandos de inicio (opcional, Railway usa nixpacks.toml)

## 🔄 Actualizar el Deployment

Cada vez que hagas push a la rama `main` de GitHub, Railway desplegará automáticamente los cambios.

Para forzar un nuevo deployment:
1. Ve a **Deployments**
2. Haz clic en **Redeploy** en el deployment más reciente

