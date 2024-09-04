<?php

namespace App\Modules\InstituteManagement\Institutes\Services;

use App\Http\Services\FileService;
use App\Modules\InstituteManagement\Institutes\Models\Institute;

class InstituteAuthFileService
{

    public function __construct(private InstituteAuthService $instituteAuthService, private FileService $fileService){}

    private function saveFile(Institute $institute, string $file_name, string $path): Institute
    {
        $saved_file_name = $this->fileService->save_file($file_name, $path);
        return $this->instituteAuthService->updateInstitute([
            $file_name => $saved_file_name,
        ], $institute);
    }

    public function saveRegCertification(Institute $institute): Institute
    {
        return $this->saveFile($institute, 'reg_certification', (new Institute)->reg_certification_path);
    }

    public function savePrincipalSignature(Institute $institute): Institute
    {
        return $this->saveFile($institute, 'principal_signature', (new Institute)->principal_signature_path);
    }

    public function saveSeal(Institute $institute): Institute
    {
        return $this->saveFile($institute, 'seal', (new Institute)->seal_path);
    }

}
