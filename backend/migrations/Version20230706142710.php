<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230706142710 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ride ADD departure_time DATETIME NOT NULL, ADD arrival_time DATETIME NOT NULL, DROP date, DROP time, DROP ride_length');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ride ADD date DATE NOT NULL, ADD time VARCHAR(60) NOT NULL, ADD ride_length VARCHAR(40) NOT NULL, DROP departure_time, DROP arrival_time');
    }
}
