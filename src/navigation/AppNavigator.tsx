import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GenreScreen from '@/features/books/screens/GenreScreen';
import BookListScreen from '@/features/books/screens/BookListScreen';

export type RootStackParamList = {
  Genre: undefined;
  BookList: { genre: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Genre" component={GenreScreen} />
      <Stack.Screen name="BookList" component={BookListScreen} />
    </Stack.Navigator>
  );
}
