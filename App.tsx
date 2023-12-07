import { React, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList,
} from 'react-native';

function App() {
  const [news, setNews] = useState([]);
  const [text, onChangeText] = useState('');
  const [isLoading, setLoading] = useState(false);
  const search = function () {
    setLoading(true);
    setNews([]);
    fetch(
      'https://newsdata.io/api/1/news?language=en&apikey=pub_34292f78f3c832dc04a225f069e0e9d8b6386&q=' +
        text
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setNews(data.results);
        setLoading(false);
      });
  };
  return (
    <View style={{ padding: 10, flex: 1, alignItems: 'center', gap: 20 }}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Введите запрос"
        multiline={true}
      />
      <Button title="Искать!" onPress={search} />
      {isLoading ? <ActivityIndicator size={'large'} /> : null}
      {news.length > 0 ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          {news.map((article) => (
            <View key={article.article_id} style={styles.new}>
              {article.image_url ? (
                <Image
                  source={{ uri: article.image_url }}
                  style={styles.image}
                />
              ) : (
                <View
                  style={{
                    width: 100,
                    height: 100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text>No image</Text>
                </View>
              )}
              <Text style={styles.title}>{article.title}</Text>
            </View>
          ))}
        </ScrollView>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 3,
    width: 200,
  },
  new: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
    alignItems: 'center',
  },
  image: { width: 100, height: 100, borderRadius: 5 },
  title: { color: 'black', width: 220 },
});

export default App;
