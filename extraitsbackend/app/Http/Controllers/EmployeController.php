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

}