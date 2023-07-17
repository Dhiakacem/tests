<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230714072601 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking_ride DROP FOREIGN KEY FK_83AC5E9E3301C60');
        $this->addSql('ALTER TABLE booking_ride DROP FOREIGN KEY FK_83AC5E9E302A8A70');
        $this->addSql('ALTER TABLE booking_user DROP FOREIGN KEY FK_9502F4073301C60');
        $this->addSql('ALTER TABLE booking_user DROP FOREIGN KEY FK_9502F407A76ED395');
        $this->addSql('DROP TABLE booking_ride');
        $this->addSql('DROP TABLE booking_user');
        $this->addSql('ALTER TABLE booking ADD user_id INT DEFAULT NULL, ADD ride_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDEA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE booking ADD CONSTRAINT FK_E00CEDDE302A8A70 FOREIGN KEY (ride_id) REFERENCES ride (id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDEA76ED395 ON booking (user_id)');
        $this->addSql('CREATE INDEX IDX_E00CEDDE302A8A70 ON booking (ride_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDEA76ED395');
        $this->addSql('ALTER TABLE booking DROP FOREIGN KEY FK_E00CEDDE302A8A70');
        $this->addSql('DROP INDEX IDX_E00CEDDEA76ED395 ON booking');
        $this->addSql('DROP INDEX IDX_E00CEDDE302A8A70 ON booking');
        $this->addSql('ALTER TABLE booking DROP user_id, DROP ride_id');
    }
}
