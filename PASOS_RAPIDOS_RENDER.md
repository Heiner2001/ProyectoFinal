# 🚀 Pasos Rápidos para Corregir el Deployment en Render

## ⚠️ Problema Actual

El deployment falló con: "Exited with status 1 while building your code"

## ✅ Solución Rápida

### Paso 1: Crear Base de Datos PostgreSQL (Si no existe)

1. En Render Dashboard, haz clic en **New +**
2. Selecciona **PostgreSQL**
3. Configura:
   - **Name**: `kanban-database`
   - **Database**: `kanban_db`
   - **User**: `kanban_user`
   - **Region**: `Oregon` (misma que el web service)
   - **Plan**: `Free`
4. Haz clic en **Create Database**
5. ⚠️ **IMPORTANTE**: Copia la **Internal Database URL**
   - Se ve algo como: `postgresql://kanban_user:password@dpg-xxxxx-a/kanban_db`

### Paso 2: Configurar DATABASE_URL

1. Ve al servicio **kanban-backend**
2. Ve a la pestaña **Environment**
3. Haz clic en **Add Environment Variable**
4. Agrega:
   - **Key**: `DATABASE_URL`
   - **Value**: Pega la **Internal Database URL** que copiaste
5. Haz clic en **Save Changes**

### Paso 3: Verificar Otras Variables de Entorno

Asegúrate de que estas variables estén configuradas:

```
PYTHON_VERSION=3.11.0
SECRET_KEY=<debe estar configurado>
DEBUG=False
ALLOWED_HOSTS=kanban-backend.onrender.com,*.onrender.com
USE_HTTPS=True
DATABASE_URL=<la URL que copiaste>
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://heiner2001.github.io,https://heiner2001.github.io/ProyectoFinal
CSRF_TRUSTED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,https://heiner2001.github.io,https://heiner2001.github.io/ProyectoFinal
SESSION_COOKIE_SAMESITE=None
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SAMESITE=None
CSRF_COOKIE_SECURE=True
```

### Paso 4: Hacer Manual Deploy

1. En el servicio **kanban-backend**
2. Haz clic en **Manual Deploy** (arriba a la derecha)
3. Selecciona **Deploy latest commit**
4. Espera 5-10 minutos

### Paso 5: Verificar los Logs

1. Ve a la pestaña **Logs**
2. Verifica que el build sea exitoso
3. Si hay errores, cópialos y compártelos

## 🔍 Si Aún Falla

### Revisar los Logs

1. Ve a **Logs** del servicio **kanban-backend**
2. Busca el error específico (aparece en rojo)
3. Los errores comunes son:
   - `django.db.utils.OperationalError`: DATABASE_URL incorrecta
   - `ModuleNotFoundError`: Dependencia faltante
   - `CommandError`: Error en comando de Django

### Solución Temporal: Build Sin Migraciones

Si las migraciones causan problemas, puedes modificar el Build Command:

1. Ve a **Settings** del servicio
2. Cambia **Build Command** a:
   ```
   pip install -r requirements.txt && python manage.py collectstatic --noinput
   ```
3. Ejecuta las migraciones después desde **Shell**:
   ```
   python manage.py migrate
   ```

## ✅ Después del Deployment Exitoso

1. Ve a **Logs** y verifica que el servidor esté corriendo
2. Abre: `https://kanban-backend-9wbt.onrender.com/api/user/`
3. Debe responder (aunque sea error 401)
4. Crea usuarios:
   - Ve a **Shell**
   - Ejecuta: `python manage.py createsuperuser`
   - Sigue las instrucciones

## 📝 Checklist

- [ ] Base de datos PostgreSQL creada
- [ ] DATABASE_URL configurada en variables de entorno
- [ ] Todas las variables de entorno configuradas
- [ ] Manual Deploy ejecutado
- [ ] Logs verificados (sin errores)
- [ ] Servidor corriendo
- [ ] Usuarios creados

