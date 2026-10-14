// Tableaux 4 et 5 du papier KES 2026 : [exactitude, F1, précision, rappel] par algorithme
// d'apprentissage par renforcement, pour chaque représentation des données (PCA, AE).
const kes26Results = {
  'NSL-KDD': {
    DQN: {PCA: [0.73, 0.71, 0.94, 0.57], AE: [0.72, 0.71, 0.86, 0.61]},
    A2C: {PCA: [0.73, 0.7, 0.99, 0.54], AE: [0.76, 0.75, 0.96, 0.61]},
    PPO: {PCA: [0.72, 0.71, 0.94, 0.57], AE: [0.71, 0.69, 0.89, 0.56]},
  },
  CICIDS17: {
    DQN: {PCA: [0.87, 0.6, 0.6, 0.6], AE: [0.87, 0.6, 0.6, 0.6]},
    A2C: {PCA: [0.83, 0.55, 0.5, 0.6], AE: [0.87, 0.6, 0.6, 0.6]},
    PPO: {PCA: [0.84, 0.56, 0.53, 0.6], AE: [0.87, 0.6, 0.58, 0.6]},
  },
  'UNSW-NB15': {
    DQN: {PCA: [0.7, 0.67, 0.63, 0.71], AE: [0.68, 0.65, 0.63, 0.68]},
    A2C: {PCA: [0.68, 0.67, 0.63, 0.71], AE: [0.6, 0.5, 0.56, 0.45]},
    PPO: {PCA: [0.74, 0.74, 0.67, 0.83], AE: [0.68, 0.63, 0.65, 0.61]},
  },
  'ToN-IoT': {
    DQN: {PCA: [0.85, 0.58, 0.52, 0.65], AE: [0.81, 0.61, 0.6, 0.62]},
    A2C: {PCA: [0.67, 0.47, 0.38, 0.62], AE: [0.78, 0.64, 0.52, 0.82]},
    PPO: {PCA: [0.73, 0.52, 0.46, 0.61], AE: [0.81, 0.66, 0.61, 0.72]},
  },
};

export default kes26Results;
