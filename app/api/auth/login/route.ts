import { NextRequest, NextResponse } from 'next/server';
import { LoginCredentials, AuthResponse, User } from '../../../../lib/types/auth';

// Simulation d'une base de données utilisateurs
// En production, remplacez par une vraie base de données
const users = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123', // En production, utilisez des mots de passe hashés
    name: 'Utilisateur Demo',
    phone: '+225 07 12 34 56 78',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    email: 'admin@example.com',
    password: 'admin123',
    name: 'Administrateur',
    phone: '+225 07 98 76 54 32',
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const credentials: LoginCredentials = await request.json();

    // Validation des données
    if (!credentials.email || !credentials.password) {
      return NextResponse.json({
        success: false,
        error: 'Email et mot de passe requis',
      }, { status: 400 });
    }

    // Recherche de l'utilisateur
    const user = users.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!user) {
      return NextResponse.json({
        success: false,
        error: 'Email ou mot de passe incorrect',
      }, { status: 401 });
    }

    // Création de la réponse utilisateur (sans le mot de passe)
    const userResponse: User = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      role: user.role as any,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    // En production, générez un vrai token JWT
    const token = `mock_token_${user.id}_${Date.now()}`;

    const response: AuthResponse = {
      success: true,
      user: userResponse,
      token,
      message: 'Connexion réussie',
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur de connexion:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur',
    }, { status: 500 });
  }
}
