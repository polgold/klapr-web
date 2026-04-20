import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const SLUGS = [
  "crear-cuenta",
  "importar-clientes",
  "pipeline-kanban",
  "asignar-crew",
  "facturacion-afip",
  "presupuestos-pdf",
  "conectar-claude",
  "white-label",
];

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    SLUGS.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const tut = getTutorial(slug, locale);
  if (!tut) return {};
  return { title: tut.title, description: tut.desc };
}

// --- Tutorial content ---

type Step = { title: string; body: string };
type Tutorial = {
  title: string;
  desc: string;
  time: string;
  steps: Step[];
  note?: string;
  warning?: string;
};

function getTutorial(slug: string, locale: string): Tutorial | null {
  const es = locale === "es";

  const tutorials: Record<string, Tutorial> = {
    "crear-cuenta": {
      title: es ? "Crear tu cuenta y primera organización" : "Create your account and first organization",
      desc: es ? "Cómo registrarte, confirmar tu email y configurar tu organización." : "How to sign up, confirm your email, and set up your organization.",
      time: "5 min",
      steps: es ? [
        { title: "Registrate en Klapr", body: "Ingresá a app.klapr.io y hacé clic en \"Crear cuenta\". Completá tu nombre, email y contraseña. Vas a recibir un email de confirmación." },
        { title: "Confirmá tu email", body: "Abrí el email de Klapr y hacé clic en el link de confirmación. Si no lo ves, revisá la carpeta de spam." },
        { title: "Creá tu primera organización", body: "Al ingresar por primera vez, Klapr te pide crear una organización. Completá el nombre de tu productora." },
        { title: "Completá los datos fiscales", body: "En Configuración → Organización, completá CUIT, condición de IVA (Monotributo / Responsable Inscripto) y domicilio fiscal. Estos datos se usan en presupuestos y facturas." },
        { title: "Subí tu logo y elegí tu color", body: "Desde la misma pantalla de Organización, podés subir tu logo (recomendado: PNG cuadrado, fondo transparente) y elegir tu color de marca. Aparecerá en el encabezado y en los documentos." },
      ] : [
        { title: "Sign up for Klapr", body: "Go to app.klapr.io and click 'Create account'. Enter your name, email, and password. You'll receive a confirmation email." },
        { title: "Confirm your email", body: "Open the Klapr email and click the confirmation link. If you don't see it, check your spam folder." },
        { title: "Create your first organization", body: "When you first log in, Klapr asks you to create an organization. Enter your production company's name." },
        { title: "Fill in tax information", body: "In Settings → Organization, fill in your tax ID, VAT status, and fiscal address. This data is used in quotes and invoices." },
        { title: "Upload your logo and choose your color", body: "From the same Organization screen, you can upload your logo (recommended: square PNG, transparent background) and choose your brand color. It will appear in the header and documents." },
      ],
    },

    "importar-clientes": {
      title: es ? "Importar clientes con IA" : "Import clients with AI",
      desc: es ? "Pegá una lista de nombres y dejá que Claude complete el resto." : "Paste a list of names and let Claude fill in the rest.",
      time: "5 min",
      steps: es ? [
        { title: "Abrí el importador", body: "En la sección Clientes, hacé clic en \"Importar con IA\". Se abre un panel de texto." },
        { title: "Pegá los nombres", body: "Pegá la lista de nombres de empresas o clientes, uno por línea (o separados por comas). Pueden ser marcas, agencias, estudios — cualquier nombre." },
        { title: "Confirmá el análisis", body: "Claude analiza cada nombre e intenta enriquecer automáticamente: rubro de la empresa, website, Instagram y cargo probable del contacto principal." },
        { title: "Revisá y editá", body: "Aparece una tabla con los resultados. Podés editar cualquier campo antes de confirmar. Si Claude no encontró información para algún cliente, podés completarla manualmente." },
        { title: "Creá los clientes", body: "Hacé clic en \"Crear todos\" o seleccioná los que querés crear. Los clientes se agregan a tu base de datos listos para usar." },
      ] : [
        { title: "Open the importer", body: "In the Clients section, click 'Import with AI'. A text panel opens." },
        { title: "Paste the names", body: "Paste the list of company or client names, one per line (or comma-separated). They can be brands, agencies, studios — any name." },
        { title: "Confirm the analysis", body: "Claude analyzes each name and tries to automatically enrich: company industry, website, Instagram, and likely role of the main contact." },
        { title: "Review and edit", body: "A table appears with the results. You can edit any field before confirming. If Claude didn't find information for a client, you can fill it in manually." },
        { title: "Create the clients", body: "Click 'Create all' or select the ones you want to create. The clients are added to your database ready to use." },
      ],
    },

    "pipeline-kanban": {
      title: es ? "Armar tu pipeline en Kanban" : "Set up your Kanban pipeline",
      desc: es ? "Crear trabajos, moverlos entre estados y asociarlos a clientes." : "Create jobs, move them between stages, and link them to clients.",
      time: "10 min",
      steps: es ? [
        { title: "Abrí la sección Trabajos", body: "En la barra lateral hacé clic en \"Trabajos\". Vas a ver el tablero Kanban con las columnas de estados." },
        { title: "Creá tu primer trabajo", body: "Hacé clic en \"+ Nuevo trabajo\". Completá: nombre del trabajo, tipo (spot, cobertura, documental, etc.), cliente asociado y estado inicial." },
        { title: "Configurá los detalles", body: "Dentro del trabajo podés agregar: presupuesto estimado, fecha de inicio, fecha de entrega, descripción y notas internas." },
        { title: "Mové el trabajo entre estados", body: "Arrastrá la tarjeta del trabajo de una columna a otra conforme avanza la producción: Lead → Propuesta enviada → Confirmado → En producción → Post → Entregado → Facturado." },
        { title: "Usá los filtros", body: "En la parte superior del tablero podés filtrar por cliente, tipo de trabajo o rango de fechas para encontrar rápidamente lo que buscás." },
      ] : [
        { title: "Open the Projects section", body: "In the sidebar click 'Projects'. You'll see the Kanban board with stage columns." },
        { title: "Create your first job", body: "Click '+ New job'. Fill in: job name, type (spot, coverage, documentary, etc.), linked client, and initial stage." },
        { title: "Configure the details", body: "Inside the job you can add: estimated budget, start date, delivery date, description, and internal notes." },
        { title: "Move the job between stages", body: "Drag the job card from one column to another as production progresses: Lead → Proposal sent → Confirmed → In production → Post → Delivered → Invoiced." },
        { title: "Use the filters", body: "At the top of the board you can filter by client, job type, or date range to quickly find what you're looking for." },
      ],
    },

    "asignar-crew": {
      title: es ? "Asignar crew a un trabajo" : "Assign crew to a job",
      desc: es ? "Agregar proveedores al trabajo con rol, fecha de servicio y tarifa." : "Add suppliers to a job with role, service date, and rate.",
      time: "5 min",
      steps: es ? [
        { title: "Abrí el trabajo", body: "En el tablero Kanban, hacé clic en el trabajo al que querés asignar crew." },
        { title: "Ir a la pestaña Crew", body: "Dentro del trabajo, hacé clic en la pestaña \"Crew\" o \"Equipo asignado\"." },
        { title: "Agregá un proveedor/crew", body: "Hacé clic en \"+ Agregar crew\". Buscá al proveedor por nombre — tiene que estar previamente cargado en tu base de Proveedores." },
        { title: "Completá los detalles del servicio", body: "Para cada crew completá: rol en este trabajo (puede diferir de su especialidad general), fecha de servicio, tarifa para este trabajo (USD o ARS), y si ya está confirmado." },
        { title: "Repetí para todo el crew", body: "Agregá todos los técnicos y proveedores necesarios. Podés ver el total de crew cost del trabajo en tiempo real." },
      ] : [
        { title: "Open the job", body: "In the Kanban board, click the job you want to assign crew to." },
        { title: "Go to the Crew tab", body: "Inside the job, click the 'Crew' or 'Assigned crew' tab." },
        { title: "Add a supplier/crew", body: "Click '+ Add crew'. Search for the supplier by name — they must already be in your Suppliers database." },
        { title: "Fill in the service details", body: "For each crew member fill in: role on this job (can differ from their general specialty), service date, rate for this job (USD or ARS), and whether they're confirmed." },
        { title: "Repeat for all crew", body: "Add all the technicians and suppliers needed. You can see the total crew cost for the job in real time." },
      ],
    },

    "facturacion-afip": {
      title: es ? "Configurar facturación electrónica AFIP" : "Set up AFIP electronic invoicing",
      desc: es ? "Subir certificado ARCA, configurar punto de venta y emitir la primera factura real." : "Upload your ARCA certificate, configure your point of sale, and issue your first real invoice.",
      time: "20 min",
      warning: es
        ? "Este proceso requiere un certificado AFIP productivo. Si no lo tenés, debés tramitarlo en el sitio de ARCA (afip.gob.ar) con tu CUIT y clave fiscal. El certificado para Klapr se obtiene dentro del servicio WSFE de ARCA."
        : "This process requires a production AFIP certificate. If you don't have one, you must obtain it from the ARCA website (afip.gob.ar) with your tax ID and fiscal password.",
      steps: es ? [
        { title: "Obtené tu certificado AFIP", body: "Entrá a afip.gob.ar con tu CUIT y clave fiscal. Buscá el servicio WSFE (Factura Electrónica). En la sección de certificados, generá uno nuevo y descargá el archivo .crt y la clave privada .key." },
        { title: "Configurá la facturación en Klapr", body: "En Klapr, andá a Configuración → Facturación. Subí el certificado (.crt) y la clave privada (.key). Seleccioná tu condición impositiva: Monotributo o Responsable Inscripto." },
        { title: "Configurá el punto de venta", body: "Indicá el número de punto de venta que vas a usar (el mismo que tenés habilitado en AFIP para el servicio WSFE). Si no tenés ninguno habilitado, debés darlo de alta en el sitio de AFIP primero." },
        { title: "Asociá un trabajo", body: "Abrí el trabajo que querés facturar (debe estar en estado \"Entregado\"). Hacé clic en \"+ Nueva factura\"." },
        { title: "Completá los datos de la factura", body: "Seleccioná el tipo de comprobante (C para Monotributo, A o B para RI), el cliente (con su CUIT cargado), el importe y el concepto. Revisá todo antes de emitir." },
        { title: "Emitir la factura", body: "Hacé clic en \"Emitir\". Klapr se conecta a ARCA WSFE, obtiene el CAE y guarda el comprobante. Podés descargar el PDF inmediatamente." },
      ] : [
        { title: "Get your AFIP certificate", body: "Log in to afip.gob.ar with your tax ID and fiscal password. Find the WSFE service (Electronic Invoice). In the certificates section, generate a new one and download the .crt file and private key .key." },
        { title: "Configure invoicing in Klapr", body: "In Klapr, go to Settings → Invoicing. Upload the certificate (.crt) and private key (.key). Select your tax status: Monotributo or Responsable Inscripto." },
        { title: "Configure your point of sale", body: "Enter the point of sale number you'll use (the same one you have enabled in AFIP for WSFE). If you don't have one enabled, you must register it on the AFIP website first." },
        { title: "Link a job", body: "Open the job you want to invoice (it should be in 'Delivered' status). Click '+ New invoice'." },
        { title: "Fill in the invoice details", body: "Select the invoice type (C for Monotributo, A or B for RI), the client (with their tax ID loaded), the amount, and the concept. Review everything before issuing." },
        { title: "Issue the invoice", body: "Click 'Issue'. Klapr connects to ARCA WSFE, gets the CAE, and saves the document. You can download the PDF immediately." },
      ],
    },

    "presupuestos-pdf": {
      title: es ? "Emitir tu primer presupuesto PDF" : "Issue your first PDF quote",
      desc: es ? "Crear, agregar items, categorizar, descargar PDF y convertir en trabajo." : "Create, add line items, categorize, download PDF, and convert to job.",
      time: "10 min",
      steps: es ? [
        { title: "Creá un nuevo presupuesto", body: "En la sección Presupuestos, hacé clic en \"+ Nuevo presupuesto\". Asignalo a un cliente existente y elegí la moneda: USD o ARS." },
        { title: "Agregá items", body: "Hacé clic en \"+ Agregar item\". Para cada item completá: descripción, categoría (producción / crew / equipo / post), cantidad, precio unitario." },
        { title: "Revisá el total", body: "El total se calcula automáticamente. Podés agregar notas o condiciones de pago al pie del presupuesto." },
        { title: "Descargá el PDF", body: "Hacé clic en \"Descargar PDF\". El documento incluye los datos de tu organización, logo, datos del cliente y el detalle de items." },
        { title: "Envialo y cambiá el estado", body: "Cuando lo enviés al cliente, cambiá el estado a \"Enviado\". Si el cliente lo aprueba, cambialo a \"Aprobado\" y luego podés convertirlo en trabajo." },
        { title: "Convertir en trabajo", body: "Con el presupuesto en estado \"Aprobado\", hacé clic en \"Convertir en trabajo\". Se crea automáticamente un trabajo con los datos del presupuesto y el cliente asociado." },
      ] : [
        { title: "Create a new quote", body: "In the Quotes section, click '+ New quote'. Assign it to an existing client and choose the currency: USD or ARS." },
        { title: "Add line items", body: "Click '+ Add item'. For each item fill in: description, category (production / crew / gear / post), quantity, unit price." },
        { title: "Review the total", body: "The total is calculated automatically. You can add notes or payment terms at the bottom of the quote." },
        { title: "Download the PDF", body: "Click 'Download PDF'. The document includes your organization data, logo, client data, and line item detail." },
        { title: "Send it and change the status", body: "When you send it to the client, change the status to 'Sent'. If the client approves, change it to 'Approved' and then you can convert it to a job." },
        { title: "Convert to job", body: "With the quote in 'Approved' status, click 'Convert to job'. A job is automatically created with the quote data and the associated client." },
      ],
    },

    "conectar-claude": {
      title: es ? "Conectar KLAPR a Claude.ai" : "Connect KLAPR to Claude.ai",
      desc: es ? "Agregá KLAPR como Custom Connector y operá desde el chat con OAuth 2.1." : "Add KLAPR as a Custom Connector and operate from chat with OAuth 2.1.",
      time: "10 min",
      note: es
        ? "Requiere plan Pro. Compatible con Claude.ai (web) y Claude Desktop (app de escritorio). El MCP endpoint de KLAPR es: https://app.klapr.io/api/mcp"
        : "Requires Pro plan. Compatible with Claude.ai (web) and Claude Desktop (desktop app). KLAPR's MCP endpoint is: https://app.klapr.io/api/mcp",
      steps: es ? [
        { title: "Abrí Claude.ai Settings", body: "Entrá a claude.ai. Hacé clic en tu avatar (esquina inferior izquierda) → Settings → Connectors." },
        { title: "Agregá un nuevo connector", body: "Hacé clic en \"Add custom connector\" (o \"Add MCP server\" según la versión). Aparece un formulario." },
        { title: "Ingresá la URL del server MCP", body: "En el campo URL ingresá: https://app.klapr.io/api/mcp — Nombre sugerido: KLAPR. Guardá." },
        { title: "Autenticá con OAuth", body: "Claude va a abrir una ventana de login de Klapr. Iniciá sesión con tu cuenta. Si tenés múltiples organizaciones, seleccioná la que querés usar. Autorizá el acceso." },
        { title: "Verificá la conexión", body: "El connector debería aparecer como \"Conectado\" con un indicador verde. Si ves un error, verificá que tu plan sea Pro y que la URL sea correcta." },
        { title: "Probá con un prompt", body: "En el chat de Claude escribí: \"Listá mis últimos 5 clientes en Klapr\". Claude debería responder con los datos reales de tu organización." },
        { title: "Tools disponibles", body: "Una vez conectado tenés acceso a: crear/buscar/editar clientes, trabajos, proveedores, seguimientos; asignar crew con tarifa; generar emails de póliza; listar comprobantes fiscales." },
      ] : [
        { title: "Open Claude.ai Settings", body: "Go to claude.ai. Click your avatar (bottom left corner) → Settings → Connectors." },
        { title: "Add a new connector", body: "Click 'Add custom connector' (or 'Add MCP server' depending on the version). A form appears." },
        { title: "Enter the MCP server URL", body: "In the URL field enter: https://app.klapr.io/api/mcp — Suggested name: KLAPR. Save." },
        { title: "Authenticate with OAuth", body: "Claude will open a Klapr login window. Log in with your account. If you have multiple organizations, select the one you want to use. Authorize access." },
        { title: "Verify the connection", body: "The connector should appear as 'Connected' with a green indicator. If you see an error, verify that your plan is Pro and that the URL is correct." },
        { title: "Test with a prompt", body: "In the Claude chat write: 'List my last 5 clients in Klapr'. Claude should respond with real data from your organization." },
        { title: "Available tools", body: "Once connected you have access to: create/search/edit clients, jobs, suppliers, follow-ups; assign crew with rates; generate insurance emails; list tax documents." },
      ],
    },

    "white-label": {
      title: es ? "White-label y branding" : "White-label and branding",
      desc: es ? "Subir logo, cambiar color de marca y configurar el perfil de tu organización." : "Upload your logo, change brand color, and configure your organization profile.",
      time: "5 min",
      steps: es ? [
        { title: "Abrí Configuración → Organización", body: "Desde la barra lateral hacé clic en el ícono de configuración o en el nombre de tu organización → Configuración de organización." },
        { title: "Subí tu logo", body: "Hacé clic en el área de logo para subir una imagen. Recomendado: PNG cuadrado con fondo transparente, mínimo 200×200px. El logo aparece en el header de la app y en todos los documentos (presupuestos, facturas)." },
        { title: "Elegí tu color de marca", body: "Usá el selector de color para elegir el color principal de tu organización. Este color se usa en los botones de acción, highlights y encabezados de documentos." },
        { title: "Completá el perfil de la organización", body: "Completá nombre legal, domicilio, datos de contacto (email, teléfono, website). Estos datos aparecen en el pie de tus documentos." },
        { title: "Guardá los cambios", body: "Hacé clic en \"Guardar\". Los cambios se aplican inmediatamente en toda la app y en los nuevos documentos que generes." },
      ] : [
        { title: "Open Settings → Organization", body: "From the sidebar click the settings icon or your organization name → Organization settings." },
        { title: "Upload your logo", body: "Click the logo area to upload an image. Recommended: square PNG with transparent background, minimum 200×200px. The logo appears in the app header and all documents (quotes, invoices)." },
        { title: "Choose your brand color", body: "Use the color picker to choose your organization's primary color. This color is used in action buttons, highlights, and document headers." },
        { title: "Complete the organization profile", body: "Fill in legal name, address, contact details (email, phone, website). This data appears in the footer of your documents." },
        { title: "Save changes", body: "Click 'Save'. Changes apply immediately across the entire app and in new documents you generate." },
      ],
    },
  };

  return tutorials[slug] ?? null;
}

// --- Page ---

export default async function DocSlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const tut = getTutorial(slug, locale);
  if (!tut) notFound();

  const es = locale === "es";

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-10">
          <Link href="/docs" className="hover:text-white transition-colors">
            {es ? "Docs" : "Docs"}
          </Link>
          <span>/</span>
          <span className="text-gray-400">{tut.title}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-gray-500">⏱ {tut.time}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight">{tut.title}</h1>
          <p className="mt-3 text-gray-400 text-lg">{tut.desc}</p>
        </div>

        {/* Warning */}
        {tut.warning && (
          <div
            className="rounded-xl p-4 mb-8 text-sm leading-relaxed"
            style={{ background: "#1e1a0f", border: "1px solid #3a2d0f", color: "#fbbf24" }}
          >
            ⚠️ {tut.warning}
          </div>
        )}

        {/* Note */}
        {tut.note && (
          <div
            className="rounded-xl p-4 mb-8 text-sm leading-relaxed"
            style={{ background: "#0f1f0f", border: "1px solid #1a3a1a", color: "#86efac" }}
          >
            💡 {tut.note}
          </div>
        )}

        {/* Steps */}
        <div className="flex flex-col gap-0">
          {tut.steps.map((step, i) => (
            <div key={step.title} className="flex gap-5 pb-8">
              {/* Step line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black flex-shrink-0"
                  style={{ background: "var(--brand)", color: "#0A0A0A" }}
                >
                  {i + 1}
                </div>
                {i < tut.steps.length - 1 && (
                  <div className="w-px flex-1 mt-2" style={{ background: "#2a2a2a" }} />
                )}
              </div>
              {/* Content */}
              <div className="flex-1 pt-1 pb-2">
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{step.body}</p>
                {/* Screenshot placeholder */}
                <div
                  className="mt-4 rounded-lg flex items-center justify-center text-xs text-gray-600 h-32"
                  style={{ background: "#111", border: "1px dashed #2a2a2a" }}
                >
                  📸 {es ? `Screenshot: ${step.title}` : `Screenshot: ${step.title}`}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom nav */}
        <div
          className="mt-10 pt-8 border-t flex items-center justify-between"
          style={{ borderColor: "#1f1f1f" }}
        >
          <Link
            href="/docs"
            className="text-sm font-medium transition-colors hover:text-white"
            style={{ color: "var(--brand)" }}
          >
            ← {es ? "Ver todos los tutoriales" : "See all tutorials"}
          </Link>
          <Link
            href="/registro"
            className="text-sm font-semibold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
            style={{ background: "var(--brand)", color: "#0A0A0A" }}
          >
            {es ? "Empezar gratis →" : "Get started free →"}
          </Link>
        </div>
      </div>
    </div>
  );
}
