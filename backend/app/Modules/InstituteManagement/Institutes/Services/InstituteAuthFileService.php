<?php

namespace App\Modules\InstituteManagement\Institutes\Services;

use App\Http\Services\FileService;
use App\Modules\InstituteManagement\Institutes\Models\School;

class InstituteAuthFileService
{

    public function __construct(private InstituteAuthService $instituteAuthService, private FileService $fileService){}

    private function saveFile(School $institute, string $file_name, string $path): School
    {
        $saved_file_name = $this->fileService->save_file($file_name, $path);
        return $this->instituteAuthService->updateInstitute([
            $file_name => $saved_file_name,
        ], $institute);
    }

    public function saveRegCertification(School $institute): School
    {
        return $this->saveFile($institute, 'reg_certification', (new School)->reg_certification_path);
    }

    public function savePrincipalSignature(School $institute): School
    {
        return $this->saveFile($institute, 'principal_signature', (new School)->principal_signature_path);
    }

    public function saveSeal(School $institute): School
    {
        return $this->saveFile($institute, 'seal', (new School)->seal_path);
    }

}
