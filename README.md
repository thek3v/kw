# KW

Proyecto corporativo orientado a automatización de procesos, datos e inteligencia artificial aplicada a empresas.

## Estructura del repositorio

```text
kw/
│
├── web/
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets/
│
├── .github/
│   └── workflows/
│       ├── ci-checks.yml
│       ├── integration.yml
│       └── deploy.yml
│
├── VERSION
├── README.md
└── .gitignore
```

---

## Web

La web está ubicada en:

```text
web/
```

### Archivos principales

- **index.html** → estructura y contenido de la página.
- **styles.css** → diseño visual.
- **script.js** → animaciones e interacción.
- **assets/** → imágenes, iconos y recursos futuros.

---

## URL DEV

La web desplegada en DEV está disponible en:

```text
https://thek3v.github.io/kw/
```

---

## Flujo CI/CD

```text
feature branch
      ↓
Pull Request hacia develop
      ↓
CI Checks
      ↓
Merge a develop
      ↓
Integration genera artifact SNAPSHOT
      ↓
Deploy manual a DEV
      ↓
GitHub Pages
```

---

## Workflows

### CI Checks

Archivo:

```text
.github/workflows/ci-checks.yml
```

Valida:

- existencia de archivos obligatorios
- estructura básica de la web
- formato de VERSION
- ausencia de archivos no deseados

---

### Integration

Archivo:

```text
.github/workflows/integration.yml
```

Se ejecuta al hacer merge o push sobre `develop`.

Genera un artifact SNAPSHOT con un nombre similar a:

```text
kw-web-0.1.0-SNAPSHOT-YYYYMMDD_HHMM-commit
```

Ejemplo:

```text
kw-web-0.1.0-SNAPSHOT-20260601_2359-667e5c9
```

---

### Deploy

Archivo:

```text
.github/workflows/deploy.yml
```

Se ejecuta manualmente desde GitHub Actions.

Permite desplegar un artifact concreto en un entorno.

#### Entornos actuales

```text
dev
pre
prod
```

Actualmente el despliegue real a GitHub Pages está configurado para **dev**.

---

## Cómo hacer deploy manual a DEV

### 1. Obtener el Run ID

Ir a:

```text
GitHub → Actions → Integration
```

Abrir el último run correcto y copiar el número final de la URL.

Ejemplo:

```text
https://github.com/thek3v/kw/actions/runs/26790098415
```

En este caso:

```text
source_run_id = 26790098415
```

---

### 2. Copiar el nombre del artifact

Ejemplo:

```text
kw-web-0.1.0-SNAPSHOT-20260601_2359-667e5c9
```

---

### 3. Lanzar Deploy

Ir a:

```text
Actions → Deploy → Run workflow
```

Rellenar:

```text
environment: dev

artifact_name:
kw-web-0.1.0-SNAPSHOT-20260601_2359-667e5c9

source_run_id:
26790098415
```

Ejecutar el workflow.

---

### 4. Verificar despliegue

Si el workflow termina correctamente debería aparecer:

```text
Reported success!
```

y la web quedará disponible en:

```text
https://thek3v.github.io/kw/
```

---

## Versionado

La versión actual del proyecto se define en:

```text
VERSION
```

Ejemplo:

```text
0.1.0-SNAPSHOT
```

### Reglas

- `SNAPSHOT` → versión en desarrollo.
- Sin `SNAPSHOT` → versión estable o release.

Ejemplos:

```text
0.1.0-SNAPSHOT
0.1.0
0.1.1-SNAPSHOT
```

---

## Estado actual

- Web estática creada con HTML, CSS y JavaScript.
- Diseño futurista, tecnológico y responsive.
- Despliegue DEV funcionando en GitHub Pages.
- CI Checks configurado.
- Integration Build configurado.
- Deploy manual configurado.
 
---