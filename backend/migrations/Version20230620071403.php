<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20230620071403 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ride ADD user_id INT NOT NULL');
        $this->addSql('ALTER TABLE ride ADD CONSTRAINT FK_9B3D7CD0A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('CREATE INDEX IDX_9B3D7CD0A76ED395 ON ride (user_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE ride DROP FOREIGN KEY FK_9B3D7CD0A76ED395');
        $this->addSql('DROP INDEX IDX_9B3D7CD0A76ED395 ON ride');
        $this->addSql('ALTER TABLE ride DROP user_id');
    }
}
