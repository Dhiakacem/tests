<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230713130029 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE booking_user (booking_id INT NOT NULL, user_id INT NOT NULL, INDEX IDX_9502F4073301C60 (booking_id), INDEX IDX_9502F407A76ED395 (user_id), PRIMARY KEY(booking_id, user_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE booking_ride (booking_id INT NOT NULL, ride_id INT NOT NULL, INDEX IDX_83AC5E9E3301C60 (booking_id), INDEX IDX_83AC5E9E302A8A70 (ride_id), PRIMARY KEY(booking_id, ride_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE booking_user ADD CONSTRAINT FK_9502F4073301C60 FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE booking_user ADD CONSTRAINT FK_9502F407A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE booking_ride ADD CONSTRAINT FK_83AC5E9E3301C60 FOREIGN KEY (booking_id) REFERENCES booking (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE booking_ride ADD CONSTRAINT FK_83AC5E9E302A8A70 FOREIGN KEY (ride_id) REFERENCES ride (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE booking_user DROP FOREIGN KEY FK_9502F4073301C60');
        $this->addSql('ALTER TABLE booking_user DROP FOREIGN KEY FK_9502F407A76ED395');
        $this->addSql('ALTER TABLE booking_ride DROP FOREIGN KEY FK_83AC5E9E3301C60');
        $this->addSql('ALTER TABLE booking_ride DROP FOREIGN KEY FK_83AC5E9E302A8A70');
        $this->addSql('DROP TABLE booking_user');
        $this->addSql('DROP TABLE booking_ride');
    }
}
