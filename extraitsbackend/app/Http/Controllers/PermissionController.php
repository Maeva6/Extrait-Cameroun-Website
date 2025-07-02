<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
      public function updatePermissions(Request $request, User $user)
    {
        $request->validate([
            'permissions' => 'array',
        ]);

        $user->permissions = $request->permissions ?? [];
        $user->save();

        return response()->json(['success' => true]);
    }
}
