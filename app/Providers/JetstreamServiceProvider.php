<?php

namespace App\Providers;

use App\Actions\Jetstream\DeleteUser;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;

use Laravel\Jetstream\Jetstream;
use Laravel\Fortify\Fortify;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Facade\FlareClient\Http\Response;
use Illuminate\Http\Response as HttpResponse;

class JetstreamServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Fortify::authenticateUsing(function (Request $request) {
            $user = User::where('email', $request->email)->first();
        
            if ($user &&
                Hash::check($request->password, $user->password)) {
                $time = time();
                $token = Str::random(10).$time;
                $remember_token = Hash::make($token);
                $user->remember_token = $remember_token;
                $user->save();
                return $user;
            }
        });

        Fortify::loginView(function () {
            return view('auth.login');
        });

        Jetstream::deleteUsersUsing(DeleteUser::class);
    }

    

    /**
     * Configure the permissions that are available within the application.
     *
     * @return void
     */
    protected function configurePermissions()
    {
        Jetstream::defaultApiTokenPermissions(['read']);

        Jetstream::permissions([
            'create',
            'read',
            'update',
            'delete',
        ]);
    }
}
