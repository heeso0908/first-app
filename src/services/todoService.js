// Supabase 연결 시 이 파일만 교체하면 됩니다.
// import { supabase } from '../lib/supabase'

let nextId = 1;
let todos = [];

export const todoService = {
  async getAll() {
    return [...todos];
  },

  async create(text) {
    const todo = {
      id: nextId++,
      text,
      completed: false,
      created_at: new Date().toISOString(),
    };
    todos.push(todo);
    return todo;
  },

  async update(id, updates) {
    todos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updates } : todo
    );
    return todos.find((todo) => todo.id === id);
  },

  async remove(id) {
    todos = todos.filter((todo) => todo.id !== id);
  },
};

/* Supabase 전환 시 아래 코드로 교체:

export const todoService = {
  async getAll() {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(text) {
    const { data, error } = await supabase
      .from('todos')
      .insert([{ text, completed: false }])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async remove(id) {
    const { error } = await supabase.from('todos').delete().eq('id', id);
    if (error) throw error;
  },
};
*/
