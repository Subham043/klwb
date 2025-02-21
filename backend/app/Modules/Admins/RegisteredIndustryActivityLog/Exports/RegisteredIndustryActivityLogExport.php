<?php

namespace App\Modules\Admins\RegisteredIndustryActivityLog\Exports;

use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Spatie\QueryBuilder\QueryBuilder;


class RegisteredIndustryActivityLogExport implements FromQuery, WithHeadings, WithMapping
{

	private QueryBuilder $query;
	public function __construct(QueryBuilder $query)
	{
		$this->query = $query;
	}
	public function query()
	{
		return $this->query; // Using cursor() to avoid memory overload
	}

	public function map($data): array
	{
		$changes = [];
		if (
			isset($data['properties']['attributes']) &&
			is_array($data['properties']['attributes']) &&
			isset($data['properties']['old']) &&
			is_array($data['properties']['old'])
		) {
			$changes = $this->generateFieldChanges(
				$data['properties']['attributes'],
				$data['properties']['old']
			);
		}
		$changed_data = collect($changes)->first();
		return [
			$data->id,
			$data->event,
			$data->description,
			$data->causer->name ?? '',
			$data->causer->email ?? '',
			$data->causer->phone ?? '',
			$data->causer->current_role ?? '',
			!empty($changed_data) ? ($changed_data['field'] ?? 'null') : '',
			!empty($changed_data) ? ($changed_data['previous'] ?? 'null') : '',
			!empty($changed_data) ? ($changed_data['current'] ?? 'null') : '',
			$data->created_at->format('Y-m-d H:i:s') ?? '',
		];
	}

	public function headings(): array
	{
		return [
			'Id',
			'Event',
			'Description',
			'Changed By Name',
			'Changed By Email',
			'Changed By Phone',
			'Changed By Role',
			'Field Changed',
			'Field Previous Value',
			'Field Current Value',
			'Updated On',
		];
	}

	/**
	 * Generate change descriptions between two associative arrays.
	 *
	 * @param array $attributes The new data array.
	 * @param array $old The original data array.
	 * @return array An array of change descriptions.
	 */
	private function generateFieldChanges(array $attributes, array $old): array
	{
		$changes = [];

		// Iterate over each key-value pair in the new attributes
		foreach ($attributes as $key => $newValue) {
			// Check if the key exists in the old array and the values are different
			if (array_key_exists($key, $old)) {
			// if (array_key_exists($key, $old) && $old[$key] !== $newValue) {
				// Format the field name by replacing underscores with spaces
				$formattedKey = str_replace('_', ' ', $key);
				// Create the change description
				$changes[] = [
					'field' => $formattedKey,
					'previous' => $old[$key],
					'current' => $newValue
				];
			}
		}

		return $changes;
	}
}
