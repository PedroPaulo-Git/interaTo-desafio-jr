// ==============================================================
// Simple i18n System - Lightweight internationalization
// ==============================================================

export type Locale = 'pt-BR' | 'en-US'

const translations = {
    'pt-BR': {
        // Auth
        'auth.login': 'Entrar',
        'auth.register': 'Cadastrar',
        'auth.logout': 'Sair',
        'auth.email': 'E-mail',
        'auth.password': 'Senha',
        'auth.confirmPassword': 'Confirmar Senha',
        'auth.forgotPassword': 'Esqueceu a senha?',
        'auth.noAccount': 'Ainda não tem uma conta?',
        'auth.haveAccount': 'Já tem uma conta?',
        'auth.loginSuccess': 'Login realizado com sucesso!',
        'auth.loginDeveloper': 'Entrar como Desenvolvedor (Mock)',
        'auth.loginDescription': 'Entre na sua conta para gerenciar o petshop',
        'auth.registerDescription': 'Crie sua conta para começar',
        'auth.name': 'Nome',
        'auth.phone': 'Telefone',

        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.welcome': 'Bem-vindo de volta!',
        'dashboard.myAnimals': 'Meus Animais',
        'dashboard.allAnimals': 'Todos os Animais',
        'dashboard.profile': 'Meu Perfil',
        'dashboard.newAnimal': 'Cadastrar',
        'dashboard.notifications': 'Notificações',

        // Animals
        'animals.edit': 'Editar Animal',
        'animals.delete': 'Excluir Animal',
        'animals.deleteConfirm': 'Tem certeza que deseja excluir este animal?',
        'animals.name': 'Nome',
        'animals.age': 'Idade',
        'animals.breed': 'Raça',
        'animals.type': 'Tipo',
        'animals.dog': 'Cachorro',
        'animals.cat': 'Gato',
        'animals.owner': 'Tutor',
        'animals.ownerName': 'Nome do Tutor',
        'animals.contact': 'Contato',
        'animals.search': 'Buscar animal...',
        'animals.filter': 'Filtrar',
        'animals.filterAll': 'Todos',
        'animals.notFound': 'Nenhum animal encontrado',
        'animals.clickToAdd': 'Clique para adicionar foto',
        'animals.photo': 'Foto',
        'animals.years': 'anos',
        'animals.viewDetails': 'Ver Detalhes',
        'animals.created': 'Criado em',
        'animals.updated': 'Atualizado em',
        'animals.errorLoading': 'Erro ao carregar animais',
        'animals.errorUpdating': 'Erro ao atualizar animal',
        'animals.errorDeleting': 'Erro ao excluir animal',
        'animals.updateSuccess': 'Animal atualizado com sucesso!',
        'animals.deleteSuccess': 'Animal excluido com sucesso!',
        'animals.details': 'Detalhes do Animal',
        'animals.new': 'Cadastrar Novo',
        'animals.newSubtitle': 'Adicione um novo pet ao sistema',
        'animals.petData': 'Dados do Animal',
        'animals.petDataSubtitle': 'Preencha as informações do pet',
        'animals.ownerSection': 'Dados do Tutor',
        'animals.changePhoto': 'Alterar foto',
        'animals.clickToAddPhoto': 'Clique para adicionar foto',
        'animals.noPhoto': 'Sem foto',
        'animals.registeredAt': 'Cadastrado em',
        'animals.confirmDelete': 'Confirmar Exclusão',
        'animals.deleteWarning': 'Esta ação não pode ser desfeita. O registro do animal será permanentemente removido do sistema.',
        'animals.deleting': 'Excluindo...',
        'dashboard.recentAnimals': 'Animais recentes',
        'greeting.morning': 'Bom dia',
        'greeting.afternoon': 'Boa tarde',
        'greeting.evening': 'Boa noite',
        'viewMode.list': 'Lista',
        'viewMode.grid': 'Grade',
        'viewMode.compact': 'Compacto',
        'stats.totalPets': 'Total de Pets',
        'stats.dogs': 'Cachorros',
        'stats.cats': 'Gatos',
        'stats.avgAge': 'Idade Média',
        'stats.title': 'Estatísticas do Petshop',

        // Profile
        'profile.title': 'Meu Perfil',
        'profile.personalInfo': 'Informações Pessoais',
        'profile.settings': 'Configurações',
        'profile.theme': 'Tema',
        'profile.language': 'Idioma',
        'profile.updateSuccess': 'Perfil atualizado com sucesso!',
        'profile.notifications': 'Notificações',
        'profile.emailNotifications': 'Notificações por E-mail',
        'profile.pushNotifications': 'Notificações Push',
        'profile.manageInfo': 'Gerencie suas informações',
        'profile.fullName': 'Nome completo',
        'profile.memberSince': 'Membro desde',
        'profile.emailNote': 'O e-mail não pode ser alterado',
        'profile.editBtn': 'Editar Perfil',
        'profile.settingsDescription': 'Gerencie suas preferências',
        'profile.securityLabel': 'Segurança',
        'profile.securityDescription': 'Senha e autenticação',
        'profile.appearanceLabel': 'Aparência',
        'profile.appearanceDescription': 'Tema e personalização',
        'profile.pushDescription': 'Receber alertas no dispositivo',
        'profile.logoutBtn': 'Sair da conta',
        'profile.notificationsDescription': 'Configurar alertas e lembretes',

        // Common
        'common.save': 'Salvar',
        'common.cancel': 'Cancelar',
        'common.edit': 'Editar',
        'common.delete': 'Deletar',
        'common.search': 'Buscar',
        'common.loading': 'Carregando...',
        'common.saving': 'Salvando...',
        'common.select': 'Selecione',
        'common.upTo': 'até',
        'common.or': 'ou',
        'common.close': 'Fechar',
        'common.yes': 'Sim',
        'common.no': 'Não',
        'common.submit': 'Enviar',
        'common.back': 'Voltar',
    },
    'en-US': {
        // Auth
        'auth.login': 'Login',
        'auth.register': 'Register',
        'auth.logout': 'Logout',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.confirmPassword': 'Confirm Password',
        'auth.forgotPassword': 'Forgot password?',
        'auth.noAccount': "Don't have an account?",
        'auth.haveAccount': 'Already have an account?',
        'auth.loginSuccess': 'Successfully logged in!',
        'auth.loginDeveloper': 'Enter as Developer (Mock)',
        'auth.loginDescription': 'Sign in to your account to manage the pet shop',
        'auth.registerDescription': 'Create your account to get started',
        'auth.name': 'Name',
        'auth.phone': 'Phone',

        // Dashboard
        'dashboard.title': 'Dashboard',
        'dashboard.welcome': 'Welcome back!',
        'dashboard.myAnimals': 'My Animals',
        'dashboard.allAnimals': 'All Animals',
        'dashboard.profile': 'My Profile',
        'dashboard.newAnimal': 'Register',
        'dashboard.notifications': 'Notifications',

        // Animals
        'animals.edit': 'Edit Animal',
        'animals.delete': 'Delete Animal',
        'animals.deleteConfirm': 'Are you sure you want to delete this animal?',
        'animals.name': 'Name',
        'animals.age': 'Age',
        'animals.breed': 'Breed',
        'animals.type': 'Type',
        'animals.dog': 'Dog',
        'animals.cat': 'Cat',
        'animals.owner': 'Owner',
        'animals.ownerName': 'Owner Name',
        'animals.contact': 'Contact',
        'animals.search': 'Search animal...',
        'animals.filter': 'Filter',
        'animals.filterAll': 'All',
        'animals.notFound': 'No animals found',
        'animals.clickToAdd': 'Click to add photo',
        'animals.photo': 'Photo',
        'animals.years': 'years',
        'animals.viewDetails': 'View Details',
        'animals.created': 'Created at',
        'animals.updated': 'Updated at',
        'animals.errorLoading': 'Error loading animals',
        'animals.errorUpdating': 'Error updating animal',
        'animals.errorDeleting': 'Error deleting animal',
        'animals.updateSuccess': 'Animal updated successfully!',
        'animals.deleteSuccess': 'Animal deleted successfully!',
        'animals.details': 'Animal Details',
        'animals.new': 'Register New',
        'animals.newSubtitle': 'Add a new pet to the system',
        'animals.petData': 'Pet Data',
        'animals.petDataSubtitle': 'Fill in the pet information',
        'animals.ownerSection': 'Owner Data',
        'animals.changePhoto': 'Change photo',
        'animals.clickToAddPhoto': 'Click to add photo',
        'animals.noPhoto': 'No photo',
        'animals.registeredAt': 'Registered at',
        'animals.confirmDelete': 'Confirm Deletion',
        'animals.deleteWarning': 'This action cannot be undone. The animal record will be permanently removed from the system.',
        'animals.deleting': 'Deleting...',
        'dashboard.recentAnimals': 'Recent animals',
        'greeting.morning': 'Good morning',
        'greeting.afternoon': 'Good afternoon',
        'greeting.evening': 'Good evening',
        'viewMode.list': 'List',
        'viewMode.grid': 'Grid',
        'viewMode.compact': 'Compact',
        'stats.totalPets': 'Total Pets',
        'stats.dogs': 'Dogs',
        'stats.cats': 'Cats',
        'stats.avgAge': 'Average Age',
        'stats.title': 'Petshop Statistics',

        // Profile
        'profile.title': 'My Profile',
        'profile.personalInfo': 'Personal Information',
        'profile.settings': 'Settings',
        'profile.theme': 'Theme',
        'profile.language': 'Language',
        'profile.updateSuccess': 'Profile updated successfully!',
        'profile.notifications': 'Notifications',
        'profile.emailNotifications': 'Email Notifications',
        'profile.pushNotifications': 'Push Notifications',
        'profile.manageInfo': 'Manage your information',
        'profile.fullName': 'Full name',
        'profile.memberSince': 'Member since',
        'profile.emailNote': 'Email cannot be changed',
        'profile.editBtn': 'Edit Profile',
        'profile.settingsDescription': 'Manage your preferences',
        'profile.securityLabel': 'Security',
        'profile.securityDescription': 'Password and authentication',
        'profile.appearanceLabel': 'Appearance',
        'profile.appearanceDescription': 'Theme and personalization',
        'profile.pushDescription': 'Receive alerts on your device',
        'profile.logoutBtn': 'Logout',
        'profile.notificationsDescription': 'Configure alerts and reminders',

        // Common
        'common.save': 'Save',
        'common.cancel': 'Cancel',
        'common.edit': 'Edit',
        'common.delete': 'Delete',
        'common.search': 'Search',
        'common.loading': 'Loading...',
        'common.saving': 'Saving...',
        'common.select': 'Select',
        'common.upTo': 'up to',
        'common.or': 'or',
        'common.close': 'Close',
        'common.yes': 'Yes',
        'common.no': 'No',
        'common.submit': 'Submit',
        'common.back': 'Back',
    },
}

export type TranslationKey = keyof typeof translations['pt-BR']

const LOCALE_STORAGE_KEY = 'locale'

export function getLocale(): Locale {
    if (typeof window === 'undefined') return 'pt-BR'
    return (localStorage.getItem(LOCALE_STORAGE_KEY) as Locale) || 'pt-BR'
}

export function setLocale(locale: Locale): void {
    if (typeof window === 'undefined') return
    const current = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (current === locale) return

    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    window.dispatchEvent(new CustomEvent('localeChange', { detail: locale }))
}

export function t(key: TranslationKey): string {
    const locale = getLocale()
    return translations[locale][key] as string || key
}

// Hook to use translations reactively
import { useState, useEffect, useCallback } from 'react'

export function useTranslation() {
    const [locale, setLocaleState] = useState<Locale>('pt-BR')

    useEffect(() => {
        // Set initial locale
        setLocaleState(getLocale())

        // Listen for locale changes
        const handleLocaleChange = (e: Event) => {
            const customEvent = e as CustomEvent<Locale>
            if (customEvent.detail) {
                setLocaleState(customEvent.detail)
            }
        }

        window.addEventListener('localeChange', handleLocaleChange)
        return () => {
            window.removeEventListener('localeChange', handleLocaleChange)
        }
    }, [])

    const translate = useCallback((key: TranslationKey): string => {
        return (translations[locale] as Record<string, string>)[key] || key
    }, [locale])

    return { t: translate, locale }
}
