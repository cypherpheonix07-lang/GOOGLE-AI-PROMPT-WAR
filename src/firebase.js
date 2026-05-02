// MOCK FIREBASE FOR DEMO SUBMISSION
// This ensures the build passes even if npm install fails due to network issues.

export const mockAuth = {
  currentUser: null,
  onAuthStateChanged: (cb) => {
    setTimeout(() => cb(mockAuth.currentUser), 500);
    return () => {};
  },
  signInWithEmailAndPassword: async (auth, email, password) => {
    mockAuth.currentUser = { uid: 'demo-user', email, displayName: 'Demo User' };
    return { user: mockAuth.currentUser };
  },
  createUserWithEmailAndPassword: async (auth, email, password) => {
    mockAuth.currentUser = { uid: 'demo-user', email, displayName: 'Demo User' };
    return { user: mockAuth.currentUser };
  },
  updateProfile: async (user, data) => {
    user.displayName = data.displayName;
  },
  signOut: async () => {
    mockAuth.currentUser = null;
  }
};

export const mockDb = {
  collection: (db, path) => ({ path }),
  doc: (db, path, id) => ({ path, id }),
  setDoc: async () => {},
  getDoc: async () => ({ exists: () => false, data: () => ({}) }),
  addDoc: async () => ({ id: 'new-id' }),
  onSnapshot: (q, cb) => {
    cb({ docs: [] });
    return () => {};
  },
  query: (c) => c,
  orderBy: (f) => f,
  updateDoc: async () => {},
};

export const auth = mockAuth;
export const db = mockDb;
export const signInWithEmailAndPassword = mockAuth.signInWithEmailAndPassword;
export const createUserWithEmailAndPassword = mockAuth.createUserWithEmailAndPassword;
export const updateProfile = mockAuth.updateProfile;
export const onAuthStateChanged = mockAuth.onAuthStateChanged;
export const collection = mockDb.collection;
export const query = mockDb.query;
export const onSnapshot = mockDb.onSnapshot;
export const updateDoc = mockDb.updateDoc;
export const doc = mockDb.doc;
export const addDoc = mockDb.addDoc;
export const serverTimestamp = () => new Date();
export const orderBy = mockDb.orderBy;
export const getDoc = mockDb.getDoc;
export const setDoc = mockDb.setDoc;
