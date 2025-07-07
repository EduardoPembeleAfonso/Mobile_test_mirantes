import { StyleSheet, TouchableOpacity, TextInput, FlatList, Image } from 'react-native';
import { Text, View } from '@/components/Themed';
import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';
import { router } from 'expo-router';

const jobs = [
  {
    id: '1',
    title: 'UI/UX Designer',
    company: 'Mirantes technologies',
    location: 'Angola, Luanda',
    tags: ['Full time', 'Design', 'Senior designer'],
    applications: 9,
    deadline: '23/09/24',
    status: 'Publicado',
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'TechFlow',
    location: 'Brasil, São Paulo',
    tags: ['Full time', 'Tech', 'Pleno'],
    applications: 15,
    deadline: '30/09/24',
    status: 'Publicado',
  },
  {
    id: '3',
    title: 'Product Manager',
    company: 'VisionWare',
    location: 'Portugal, Lisboa',
    tags: ['Full time', 'Gestão', 'Sênior'],
    applications: 5,
    deadline: '15/10/24',
    status: 'Publicado',
  },
];

export default function Jobs() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vagas</Text>
        <TouchableOpacity style={styles.addButton}
          onPress={() => router.replace("/create/createJobs")}>
          <AntDesign name="plus" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Feather name="search" size={18} color="#B0B0B0" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisar vaga"
          placeholderTextColor="#B0B0B0"
        />
      </View>

      <View style={styles.header}>
        <Text style={styles.headerTitleTwo}>Vagas publicadas</Text>
        <TouchableOpacity style={styles.seeAll} >
          <Text style={{ color: "#0B89CE" }}>Ver tudo</Text>
          <View style={styles.arrowButton}>
            <AntDesign name="arrowright" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>

      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Image
                source={require('../../assets/images/image.png')}
                style={styles.image}
              />
              <TouchableOpacity>
                <Text style={styles.statusTagDot}>...</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardSubHeader}>
              <Text style={styles.jobTitle}>{item.title}</Text>
              <Text style={styles.statusTag}>{item.status}</Text>
            </View>
            <Text style={styles.company}>{item.company} • {item.location}</Text>
            <View style={styles.tagContainer}>
              {item.tags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>{item.applications} Candidaturas</Text>
              <Text style={styles.footerText}>Encerramento: {item.deadline}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F8',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F1F5F8',

  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0F172A',
  },
  headerTitleTwo: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  seeAll: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  addButton: {
    backgroundColor: '#0EA5E9',
    borderRadius: 999,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowButton: {
    backgroundColor: '#0B89CE',
    borderRadius: 999,
    width: 25,
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 40,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1E293B',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    height: 211
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 100
  },
  cardSubHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    marginBottom: 4,
    backgroundColor: '#FFFFFF',
  },

  jobTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0F172A',
  },
  statusTag: {
    backgroundColor: '#00C56633',
    color: '#065F46',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: "center",
    justifyContent: "center",
    height: 21
  },
  statusTagDot: {
    color: "#000",
    flexDirection: "column"
  },
  company: {
    fontSize: 12,
    color: '#9CA4AB',
    fontWeight: "400",
    marginBottom: 8,
    marginTop: 8
  },
  tagContainer: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    marginTop: 16
  },
  tag: {
    backgroundColor: '#EEF2F4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    height: 26,
    width: 82,
    justifyContent: "center",
    alignItems: "center"
  },
  tagText: {
    fontSize: 12,
    color: '#475569',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    marginTop: 30
  },
  footerText: {
    fontSize: 10,
    fontWeight: "400",
    color: '#353B3F',
  },
});
