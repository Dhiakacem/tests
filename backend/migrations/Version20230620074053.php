<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230620074053 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE review ADD ride_id INT NOT NULL');
        $this->addSql('ALTER TABLE review ADD CONSTRAINT FK_794381C6302A8A70 FOREIGN KEY (ride_id) REFERENCES ride (id)');
        $this->addSql('CREATE INDEX IDX_794381C6302A8A70 ON review (ride_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE review DROP FOREIGN KEY FK_794381C6302A8A70');
        $this->addSql('DROP INDEX IDX_794381C6302A8A70 ON review');
        $this->addSql('ALTER TABLE review DROP ride_id');
    }
}
