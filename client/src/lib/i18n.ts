import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        dashboard: "Dashboard",
        employees: "Employees",
        surveys: "Surveys",
        builder: "Survey Builder",
        distribute: "Distribution",
        sociometry: "Sociometric Graph",
        teams: "Team Builder",
        reports: "Reports"
      },
      dashboard: {
        title: "Dashboard",
        totalEmployees: "Total Employees",
        responseRate: "Response Rate",
        teamsFormed: "Teams Formed",
        cohesionIndex: "Cohesion Index",
        responseEvolution: "Response Evolution (Last 30 Days)",
        responsesByDepartment: "Responses by Department",
        choiceDistribution: "Choice Distribution"
      },
      employees: {
        title: "Employees",
        add: "Add Employee",
        import: "Import CSV",
        search: "Search employees...",
        name: "Name",
        email: "Email",
        department: "Department",
        position: "Position",
        status: "Status",
        actions: "Actions",
        edit: "Edit",
        delete: "Delete",
        active: "Active",
        inactive: "Inactive",
        confirmDelete: "Are you sure you want to delete this employee?"
      },
      survey: {
        title: "Survey Builder",
        createNew: "Create New Survey",
        surveyName: "Survey Name",
        question1: "Who would you most like to work with?",
        question2: "Who would you prefer not to work with?",
        question3: "Who is a technical reference?",
        selectUpTo: "Select up to {{count}} people",
        addQuestion: "Add Custom Question",
        preview: "Preview",
        save: "Save Survey",
        submit: "Submit Responses",
        thankYou: "Thank you for responding!",
        alreadyAnswered: "You have already answered this survey",
        distribution: "Survey Distribution",
        generateLinks: "Generate Unique Links",
        selectEmployees: "Select Employees",
        copyLink: "Copy Link",
        linkCopied: "Link copied!",
        pending: "Pending",
        completed: "Completed",
        filterAll: "All",
        filterPending: "Pending",
        filterCompleted: "Completed"
      },
      sociometry: {
        title: "Sociometric Graph",
        filters: "Filters",
        department: "Department",
        allDepartments: "All Departments",
        connectionType: "Connection Type",
        all: "All",
        positive: "Positive Only",
        negative: "Negative Only",
        minStrength: "Minimum Strength",
        topStars: "Top Stars",
        isolated: "Isolated",
        conflicts: "Conflicts"
      },
      teams: {
        title: "Team Builder",
        availablePool: "Available Employees",
        team: "Team",
        cohesion: "Cohesion",
        suggestTeams: "Suggest Teams",
        saveTeams: "Save Teams",
        editName: "Edit team name",
        conflict: "Conflict detected"
      },
      reports: {
        title: "Reports",
        type: "Report Type",
        fullAnalysis: "Complete Sociometric Analysis",
        teamReport: "Team Report",
        conflictAnalysis: "Conflict Analysis",
        selectType: "Select report type",
        filterByDate: "Filter by Date",
        filterByDepartment: "Filter by Department",
        generate: "Generate Preview",
        exportPDF: "Export PDF"
      },
      common: {
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        loading: "Loading...",
        noData: "No data available"
      }
    }
  },
  pt: {
    translation: {
      nav: {
        dashboard: "Painel",
        employees: "Funcionários",
        surveys: "Questionários",
        builder: "Criar Questionário",
        distribute: "Distribuição",
        sociometry: "Grafo Sociométrico",
        teams: "Montar Equipes",
        reports: "Relatórios"
      },
      dashboard: {
        title: "Painel",
        totalEmployees: "Total de Funcionários",
        responseRate: "Taxa de Resposta",
        teamsFormed: "Equipes Formadas",
        cohesionIndex: "Índice de Coesão",
        responseEvolution: "Evolução de Respostas (Últimos 30 Dias)",
        responsesByDepartment: "Respostas por Departamento",
        choiceDistribution: "Distribuição de Escolhas"
      },
      employees: {
        title: "Funcionários",
        add: "Adicionar Funcionário",
        import: "Importar CSV",
        search: "Buscar funcionários...",
        name: "Nome",
        email: "Email",
        department: "Departamento",
        position: "Cargo",
        status: "Status",
        actions: "Ações",
        edit: "Editar",
        delete: "Excluir",
        active: "Ativo",
        inactive: "Inativo",
        confirmDelete: "Tem certeza que deseja excluir este funcionário?"
      },
      survey: {
        title: "Criar Questionário",
        createNew: "Criar Novo Questionário",
        surveyName: "Nome do Questionário",
        question1: "Com quem você mais gostaria de trabalhar?",
        question2: "Com quem preferiria não trabalhar?",
        question3: "Quem é referência técnica?",
        selectUpTo: "Selecione até {{count}} pessoas",
        addQuestion: "Adicionar Pergunta Personalizada",
        preview: "Visualizar",
        save: "Salvar Questionário",
        submit: "Enviar Respostas",
        thankYou: "Obrigado por responder!",
        alreadyAnswered: "Você já respondeu este questionário",
        distribution: "Distribuição de Questionário",
        generateLinks: "Gerar Links Únicos",
        selectEmployees: "Selecionar Funcionários",
        copyLink: "Copiar Link",
        linkCopied: "Link copiado!",
        pending: "Pendente",
        completed: "Respondido",
        filterAll: "Todos",
        filterPending: "Pendentes",
        filterCompleted: "Respondidos"
      },
      sociometry: {
        title: "Grafo Sociométrico",
        filters: "Filtros",
        department: "Departamento",
        allDepartments: "Todos os Departamentos",
        connectionType: "Tipo de Conexão",
        all: "Todas",
        positive: "Apenas Positivas",
        negative: "Apenas Negativas",
        minStrength: "Força Mínima",
        topStars: "Top Estrelas",
        isolated: "Isolados",
        conflicts: "Conflitos"
      },
      teams: {
        title: "Montar Equipes",
        availablePool: "Funcionários Disponíveis",
        team: "Equipe",
        cohesion: "Coesão",
        suggestTeams: "Sugerir Equipes",
        saveTeams: "Salvar Equipes",
        editName: "Editar nome da equipe",
        conflict: "Conflito detectado"
      },
      reports: {
        title: "Relatórios",
        type: "Tipo de Relatório",
        fullAnalysis: "Análise Sociométrica Completa",
        teamReport: "Relatório de Equipe",
        conflictAnalysis: "Análise de Conflitos",
        selectType: "Selecione o tipo de relatório",
        filterByDate: "Filtrar por Data",
        filterByDepartment: "Filtrar por Departamento",
        generate: "Gerar Visualização",
        exportPDF: "Exportar PDF"
      },
      common: {
        save: "Salvar",
        cancel: "Cancelar",
        close: "Fechar",
        loading: "Carregando...",
        noData: "Nenhum dado disponível"
      }
    }
  },
  es: {
    translation: {
      nav: {
        dashboard: "Panel",
        employees: "Empleados",
        surveys: "Encuestas",
        builder: "Crear Encuesta",
        distribute: "Distribución",
        sociometry: "Grafo Sociométrico",
        teams: "Formar Equipos",
        reports: "Informes"
      },
      dashboard: {
        title: "Panel",
        totalEmployees: "Total de Empleados",
        responseRate: "Tasa de Respuesta",
        teamsFormed: "Equipos Formados",
        cohesionIndex: "Índice de Cohesión",
        responseEvolution: "Evolución de Respuestas (Últimos 30 Días)",
        responsesByDepartment: "Respuestas por Departamento",
        choiceDistribution: "Distribución de Elecciones"
      },
      employees: {
        title: "Empleados",
        add: "Agregar Empleado",
        import: "Importar CSV",
        search: "Buscar empleados...",
        name: "Nombre",
        email: "Correo",
        department: "Departamento",
        position: "Cargo",
        status: "Estado",
        actions: "Acciones",
        edit: "Editar",
        delete: "Eliminar",
        active: "Activo",
        inactive: "Inactivo",
        confirmDelete: "¿Está seguro de que desea eliminar este empleado?"
      },
      survey: {
        title: "Crear Encuesta",
        createNew: "Crear Nueva Encuesta",
        surveyName: "Nombre de la Encuesta",
        question1: "¿Con quién le gustaría más trabajar?",
        question2: "¿Con quién preferiría no trabajar?",
        question3: "¿Quién es referencia técnica?",
        selectUpTo: "Seleccione hasta {{count}} personas",
        addQuestion: "Agregar Pregunta Personalizada",
        preview: "Vista Previa",
        save: "Guardar Encuesta",
        submit: "Enviar Respuestas",
        thankYou: "¡Gracias por responder!",
        alreadyAnswered: "Ya ha respondido esta encuesta",
        distribution: "Distribución de Encuesta",
        generateLinks: "Generar Enlaces Únicos",
        selectEmployees: "Seleccionar Empleados",
        copyLink: "Copiar Enlace",
        linkCopied: "¡Enlace copiado!",
        pending: "Pendiente",
        completed: "Completado",
        filterAll: "Todos",
        filterPending: "Pendientes",
        filterCompleted: "Completados"
      },
      sociometry: {
        title: "Grafo Sociométrico",
        filters: "Filtros",
        department: "Departamento",
        allDepartments: "Todos los Departamentos",
        connectionType: "Tipo de Conexión",
        all: "Todas",
        positive: "Solo Positivas",
        negative: "Solo Negativas",
        minStrength: "Fuerza Mínima",
        topStars: "Top Estrellas",
        isolated: "Aislados",
        conflicts: "Conflictos"
      },
      teams: {
        title: "Formar Equipos",
        availablePool: "Empleados Disponibles",
        team: "Equipo",
        cohesion: "Cohesión",
        suggestTeams: "Sugerir Equipos",
        saveTeams: "Guardar Equipos",
        editName: "Editar nombre del equipo",
        conflict: "Conflicto detectado"
      },
      reports: {
        title: "Informes",
        type: "Tipo de Informe",
        fullAnalysis: "Análisis Sociométrico Completo",
        teamReport: "Informe de Equipo",
        conflictAnalysis: "Análisis de Conflictos",
        selectType: "Seleccione el tipo de informe",
        filterByDate: "Filtrar por Fecha",
        filterByDepartment: "Filtrar por Departamento",
        generate: "Generar Vista Previa",
        exportPDF: "Exportar PDF"
      },
      common: {
        save: "Guardar",
        cancel: "Cancelar",
        close: "Cerrar",
        loading: "Cargando...",
        noData: "No hay datos disponibles"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    lng: localStorage.getItem('language') || 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
