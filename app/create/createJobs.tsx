// CreateJobs.tsx
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, TextInput, View, Text, KeyboardAvoidingView, Platform } from 'react-native';
import DropDownPicker, { ItemType } from 'react-native-dropdown-picker';

export default function CreateJobs() {
    const [currentScreen, setCurrentScreen] = useState(1);
    const [jobData, setJobData] = useState({
        jobType: '', jobTitle: '', position: '', industry: '', yearsOfExperience: '', workRegime: '',
        location: '', contractType: '', workFormat: '', education: '', skills: '', tools: '', salary: '',
        closingDate: '', jobDescription: '',
    });

    const [dropdownStates, setDropdownStates] = useState({
        jobType: false, position: false, industry: false, yearsOfExperience: false, workRegime: false,
        contractType: false, workFormat: false, education: false, skills: false, tools: false, salary: false, closingDate: false,
    });

    const handleNext = () => setCurrentScreen(prev => prev + 1);
    const handleBack = () => setCurrentScreen(prev => prev - 1);
    const handleSubmit = () => {
        console.log('Dados da vaga:', jobData);
        alert('Vaga criada com sucesso!');
    };

    const ProgressIndicator = () => (
        <View style={styles.progressContainer}>
            <View style={[styles.progressStep, currentScreen >= 1 && styles.activeStep]} />
            <View style={[styles.progressStep, currentScreen >= 2 && styles.activeStep]} />
            <View style={[styles.progressStep, currentScreen >= 3 && styles.activeStep]} />
        </View>
    );

    const renderHeader = () => (
        <>
            <View style={styles.header}>
                {currentScreen > 1 && (
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.headerTitle}>Criar vaga</Text>
            </View>
            <ProgressIndicator />
        </>
    );

    const renderInput = (label: string, value: string, onChange: (text: string) => void) => (
        <>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.flatInput}
                placeholder={label === 'Título da vaga' ? 'Inserir título para a vaga' : 'selecionar ou pesquisar'}
                placeholderTextColor="#94A3B8"
                value={value}
                onChangeText={onChange}
            />
        </>
    );

    const renderDropdown = (
        label: string,
        stateKey: keyof typeof dropdownStates,
        items: ItemType<any>[],
        zIndex: number
    ) => {
        const handleOpen = () => {
            setDropdownStates((prev) => {
                const updatedStates: typeof dropdownStates = {} as any;
                for (const key in prev) {
                    if (key === stateKey) {
                        updatedStates[key as keyof typeof prev] = !prev[stateKey];
                    } else {
                        updatedStates[key as keyof typeof prev] = false;
                    }
                }
                return updatedStates;
            });
        };

        return (
            <>
                <Text style={styles.label}>{label}</Text>
                <DropDownPicker
                    open={dropdownStates[stateKey]}
                    value={jobData[stateKey]}
                    items={items}
                    setOpen={handleOpen}
                    setValue={(callback) =>
                        setJobData((prev) => ({ ...prev, [stateKey]: callback(prev[stateKey]) }))
                    }
                    setItems={() => { }}
                    placeholder="Selecionar ou pesquisar"
                    style={[styles.dropdown, { zIndex }]}
                    dropDownContainerStyle={[styles.dropdownContainer, { zIndex: zIndex - 1 }]}
                    placeholderStyle={{ color: '#94A3B8' }}
                    listMode="SCROLLVIEW"
                />
            </>
        );
    };

    const renderScreen1 = () => (
        <KeyboardAvoidingView style={styles.screenContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {renderHeader()}
            <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                {renderDropdown('Tipo de vaga', 'jobType', [
                    { label: 'Tempo Integral', value: 'full-time' },
                    { label: 'Meio Período', value: 'part-time' },
                    { label: 'Estágio', value: 'internship' },
                ], 1000)}

                {renderInput('Título da vaga', jobData.jobTitle, (val) => setJobData({ ...jobData, jobTitle: val }))}

                {renderDropdown('Cargo', 'position', [
                    { label: 'Desenvolvedor', value: 'developer' },
                    { label: 'Designer', value: 'designer' },
                    { label: 'Gerente de Projetos', value: 'project-manager' },
                ], 999)}

                {renderDropdown('Indústria', 'industry', [
                    { label: 'Tecnologia', value: 'tech' },
                    { label: 'Finanças', value: 'finance' },
                    { label: 'Saúde', value: 'health' },
                ], 998)}

                {renderDropdown('Anos de experiência', 'yearsOfExperience', [
                    { label: '0-1 ano', value: '0-1' },
                    { label: '1-3 anos', value: '1-3' },
                    { label: '3-5 anos', value: '3-5' },
                    { label: '5+ anos', value: '5+' },
                ], 997)}

                {renderDropdown('Regime de trabalho', 'workRegime', [
                    { label: 'Presencial', value: 'on-site' },
                    { label: 'Remoto', value: 'remote' },
                    { label: 'Híbrido', value: 'hybrid' },
                ], 996)}

                <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    const renderScreen2 = () => (
        <KeyboardAvoidingView style={styles.screenContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {renderHeader()}
            <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                {renderInput('Local', jobData.location, (val) => setJobData({ ...jobData, location: val }))}

                {renderDropdown('Tipo de contrato', 'contractType', [
                    { label: 'CLT', value: 'clt' },
                    { label: 'PJ', value: 'pj' },
                    { label: 'Freelancer', value: 'freelancer' },
                ], 1000)}

                {renderDropdown('Forma de trabalho', 'workFormat', [
                    { label: 'Presencial', value: 'on-site' },
                    { label: 'Remoto', value: 'remote' },
                    { label: 'Híbrido', value: 'hybrid' },
                ], 999)}

                {renderDropdown('Educação', 'education', [
                    { label: 'Ensino Médio', value: 'high-school' },
                    { label: 'Graduação', value: 'bachelor' },
                    { label: 'Pós-Graduação', value: 'post-grad' },
                ], 998)}

                {renderDropdown('Habilidades', 'skills', [
                    { label: 'JavaScript', value: 'javascript' },
                    { label: 'Python', value: 'python' },
                    { label: 'SQL', value: 'sql' },
                ], 997)}

                {renderDropdown('Ferramentas', 'tools', [
                    { label: 'Git', value: 'git' },
                    { label: 'Jira', value: 'jira' },
                    { label: 'Figma', value: 'figma' },
                ], 996)}

                {renderDropdown('Salário', 'salary', [
                    { label: 'A combinar', value: 'negotiable' },
                    { label: 'R$ 2.000 - R$ 4.000', value: '2000-4000' },
                    { label: 'R$ 4.000 - R$ 8.000', value: '4000-8000' },
                ], 995)}

                {renderDropdown('Data de encerramento', 'closingDate', [
                    { label: '30 dias', value: '30-days' },
                    { label: '60 dias', value: '60-days' },
                    { label: '90 dias', value: '90-days' },
                ], 994)}

                <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    const renderScreen3 = () => (
        <KeyboardAvoidingView style={styles.screenContainer} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {renderHeader()}
            <ScrollView style={styles.formContainer} keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                <TouchableOpacity style={styles.aiButton}>
                    <Text style={styles.aiButtonText}>✨ Gerar descrição com IA</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Descrição da vaga</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Descrição da vaga"
                    placeholderTextColor="#94A3B8"
                    multiline
                    numberOfLines={8}
                    value={jobData.jobDescription}
                    onChangeText={(text) => setJobData({ ...jobData, jobDescription: text })}
                />

                <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );

    switch (currentScreen) {
        case 1: return renderScreen1();
        case 2: return renderScreen2();
        case 3: return renderScreen3();
        default: return <Text>Erro: Tela não encontrada</Text>;
    }
}

const styles = StyleSheet.create({
    screenContainer: { flex: 1, backgroundColor: '#F8FAFC' },
    header: {
        flexDirection: 'row', alignItems: 'center', padding: 16,
        marginTop: 30,
        backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0',
    },
    backButton: { paddingRight: 10 },
    backButtonText: { fontSize: 24, color: '#0284C7' },
    headerTitle: { fontSize: 18, fontWeight: '600', color: '#0F172A' },
    progressContainer: {
        flexDirection: 'row', justifyContent: 'space-between',
        paddingHorizontal: 32, marginTop: 12, marginBottom: 8,
    },
    progressStep: {
        height: 4, flex: 1, backgroundColor: '#E5E7EB', marginHorizontal: 4, borderRadius: 2,
    },
    activeStep: { backgroundColor: '#0284C7' },
    formContainer: { flex: 1, padding: 16 },
    label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#0F172A' },
    flatInput: {
        backgroundColor: '#F1F5F9', borderRadius: 12, padding: 14,
        fontSize: 14, color: '#0F172A', marginBottom: 16,
    },
    dropdown: {
        backgroundColor: '#F1F5F9',
        borderColor: '#E2E8F0',
        borderRadius: 12,
        marginBottom: 16,
    },
    dropdownContainer: {
        backgroundColor: '#fff',
        borderColor: '#E2E8F0',
        borderRadius: 12,
    },
    continueButton: {
        backgroundColor: '#0284C7', paddingVertical: 14,
        borderRadius: 12, alignItems: 'center', marginTop: 30,
    },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
    aiButton: {
        backgroundColor: '#E0F2FE', paddingVertical: 14,
        borderRadius: 12, alignItems: 'center', marginBottom: 20,
    },
    aiButtonText: { color: '#0284C7', fontSize: 16, fontWeight: '600' },
    textArea: {
        backgroundColor: '#F1F5F9', borderRadius: 12, padding: 14,
        fontSize: 14, color: '#0F172A', height: 150, textAlignVertical: 'top',
    },
});
