import { NextRequest, NextResponse } from 'next/server';
import { RegisterData, AuthResponse, User } from '../../../../lib/types/auth';

// Simulation d'une base de données utilisateurs
// En production, remplacez par une vraie base de données
let users = [
  {
    id: '1',
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Utilisateur Demo',
    phone: '+225 07 12 34 56 78',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const data: RegisterData = await request.json();

    // Validation des données
    if (!data.name || !data.email || !data.password || !data.confirmPassword) {
      return NextResponse.json({
        success: false,
        error: 'Tous les champs sont requis',
      }, { status: 400 });
    }

    if (data.password !== data.confirmPassword) {
      return NextResponse.json({
        success: false,
        error: 'Les mots de passe ne correspondent pas',
      }, { status: 400 });
    }

    if (data.password.length < 6) {
      return NextResponse.json({
        success: false,
        error: 'Le mot de passe doit contenir au moins 6 caractères',
      }, { status: 400 });
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({
        success: false,
        error: 'Format d\'email invalide',
      }, { status: 400 });
    }

    // Vérification si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email === data.email);
    if (existingUser) {
      return NextResponse.json({
        success: false,
        error: 'Un compte avec cet email existe déjà',
      }, { status: 409 });
    }

    // Création du nouvel utilisateur
    const newUser = {
      id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`,
      email: data.email,
      password: data.password, // En production, hash le mot de passe
      name: data.name,
      phone: data.phone || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Ajout à la "base de données"
    users.push(newUser);

    // Création de la réponse utilisateur (sans le mot de passe)
    const userResponse: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      phone: newUser.phone,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    // En production, générez un vrai token JWT
    const token = `mock_token_${newUser.id}_${Date.now()}`;

    const response: AuthResponse = {
      success: true,
      user: userResponse,
      token,
      message: 'Inscription réussie',
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur d\'inscription:', error);
    return NextResponse.json({
      success: false,
      error: 'Erreur interne du serveur',
    }, { status: 500 });
  }
}
