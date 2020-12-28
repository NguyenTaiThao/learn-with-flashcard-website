<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    //use HasApiTokens;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table = 'users';

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'two_factor_secret',
        'two_factor_recovery_codes',
        'password'
    ];


    public function isTokenExist($token)
    {
        return User::where('remember_token', $token)->first();
    }

    // Relationship
    public function folders()
    {
        return $this->hasMany('App\Models\Folder', 'user_id', 'id');
    }

    public function bills()
    {
        return $this->hasMany('App\Models\Bill', 'user_id', 'id');
    }


    public function listFolders($current_page, $folders_per_page, $default_folder)
    {
        $offset = ($current_page - 1) * $folders_per_page;
        $folders = $this->folders()->whereNotIn('id', [$default_folder])
                                    ->orderBy('updated_at', 'DESC')
                                    ->with('sets')
                                    ->limit($folders_per_page)
                                    ->offset($offset)
                                    ->get();
        foreach ($folders as $key => $value) {
            $value->number_of_sets = count($value->sets);
        }
        $paginate = [
            'total_folders' => count($this->folders->all()),
            'current_page' => $current_page,
            'folders_per_page' => $folders_per_page
        ];
        $data['paginate'] = $paginate;
        $data['folders'] = $folders;
        return $data;
    }
}
