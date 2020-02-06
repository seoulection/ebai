class ChangeImageRecordIdToUuid < ActiveRecord::Migration[6.0]
  def change
    add_column :active_storage_attachments, :uuid, :uuid, null: false

    change_table :active_storage_attachments do |t|
      t.remove :record_id
      t.rename :uuid, :record_id
    end
  end
end
