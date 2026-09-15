<?php

namespace Database\Seeders;

use App\Models\CancellationPolicy;
use App\Models\DeletionPolicy;
use App\Models\PrivacyPolicy;
use App\Models\ReturnAndRefund;
use App\Models\TermAndCondition;
use App\Models\WhoWeAre;
use Illuminate\Database\Seeder;

class PolicySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        WhoWeAre::create([
            'document'       => 'Document',
        ]);
        TermAndCondition::create([
            'document'       => 'Document',
        ]);
        PrivacyPolicy::create([
            'document'       => 'Document',
        ]);
        CancellationPolicy::create([
            'document'       => 'Document',
        ]);
        DeletionPolicy::create([
            'document'       => 'Document',
        ]);
        ReturnAndRefund::create([
            'document'       => 'Document',
        ]);
    }
}
