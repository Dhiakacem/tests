<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230620081253 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE option_ride (option_id INT NOT NULL, ride_id INT NOT NULL, INDEX IDX_7333D633A7C41D6F (option_id), INDEX IDX_7333D633302A8A70 (ride_id), PRIMARY KEY(option_id, ride_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE option_ride ADD CONSTRAINT FK_7333D633A7C41D6F FOREIGN KEY (option_id) REFERENCES `option` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE option_ride ADD CONSTRAINT FK_7333D633302A8A70 FOREIGN KEY (ride_id) REFERENCES ride (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE option_ride DROP FOREIGN KEY FK_7333D633A7C41D6F');
        $this->addSql('ALTER TABLE option_ride DROP FOREIGN KEY FK_7333D633302A8A70');
        $this->addSql('DROP TABLE option_ride');
    }
}
