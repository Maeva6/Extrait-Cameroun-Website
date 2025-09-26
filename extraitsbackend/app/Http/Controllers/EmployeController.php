<?php
namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class EmployeController extends Controller
{
    /**
     * Affiche la liste des employés
     */
// app/Http/Controllers/EmployeController.php
public function index()
{
    return response()->json(
        User::where('role', 'employe')
            ->orderBy('created_at', 'desc')
            ->get()
    );
}

// Dans app/Http/Controllers/EmployeController.php
public function destroy($id)
{
    try {
        $employe = User::findOrFail($id);
        $employe->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Employé supprimé avec succès'
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Erreur lors de la suppression',
            'error' => $e->getMessage()
        ], 500);
    }
}
public function import(Request $request)
{
    $validated = $request->validate([
        'employes' => 'required|array|min:1',
        'employes.*.name' => 'required|string|max:255',
        'employes.*.email' => 'required|email|unique:users,email',
        'employes.*.role' => 'required|in:employe,admin',
        'employes.*.phone' => 'nullable|string|max:20',
        'employes.*.address' => 'nullable|string'
    ]);

    $createdEmployes = [];
    
    foreach ($request->employes as $employeData) {
        $employe = User::create([
            'name' => $employeData['name'],
            'email' => $employeData['email'],
            'role' => $employeData['role'],
            'phone' => $employeData['phone'] ?? null,
            'address' => $employeData['address'] ?? null,
            'password' => bcrypt('1234') // Mot de passe par défaut
        ]);
        
        $createdEmployes[] = $employe;
    }

    return response()->json([
        'success' => true,
        'count' => count($createdEmployes),
        'message' => 'Importation réussie'
    ]);
}
public function show($id)
{
    try {
        $employe = User::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $employe->id,
                'name' => $employe->name,
                'email' => $employe->email,
                'role' => $employe->role,
                'phone' => $employe->phone,
                'address' => $employe->address,
                'created_at' => $employe->created_at,
                'updated_at' => $employe->updated_at
            ]
        ]);
        
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'message' => 'Employé non trouvé'
        ], 404);
    }
}
}